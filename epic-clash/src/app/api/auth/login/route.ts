// Importa los tipos necesarios desde Next.js y otras librerías.
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Configuración para el Route Handler, activando el runtime de Edge para mejor rendimiento.
export const config = {
  runtime: "experimental-edge",
};

// Función asíncrona para manejar las solicitudes POST a este endpoint.
export async function POST(req: NextRequest) {
  // Solo permite solicitudes POST, rechaza cualquier otro método con un error 405.
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Parsea el cuerpo de la solicitud para obtener el nombre de usuario y la contraseña.
  const { username, password } = await req.json();

  // Conecta a la base de datos MongoDB.
  await dbConnect();

  // Busca un usuario existente con el nombre de usuario proporcionado.
  const user = await User.findOne({ username });
  // Si no se encuentra el usuario, retorna un error 404.
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Verifica si la contraseña proporcionada coincide con la almacenada en la base de datos.
  const isValid = await bcrypt.compare(password, user.password);
  // Si la contraseña no es válida, retorna un error 401.
  if (!isValid) {
    return new Response(JSON.stringify({ message: "Invalid password" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Genera un token JWT si la autenticación es exitosa.
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET as string, // Asegúrate de que JWT_SECRET esté definido.
    { expiresIn: "2h" } // El token expirará en 2 horas.
  );

  // Crea una nueva respuesta con el token en el cuerpo de la respuesta.
  // Se podría optar por enviar el token en una cookie para mejorar la seguridad.
  const response = new NextResponse(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Establece la cookie de forma segura en el navegador del cliente con el token JWT.
  response.headers.append(
    "Set-Cookie",
    `token=${token}; Path=/; HttpOnly; SameSite=Lax`
  );

  return response;
}
