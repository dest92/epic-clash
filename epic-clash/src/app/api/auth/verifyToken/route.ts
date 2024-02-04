import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";

// Definir una interfaz que extienda JwtPayload e incluya userId
interface TokenPayload extends JwtPayload {
  userId: string;
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return new Response(JSON.stringify({ message: "Token is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Verificar el token y asumir el tipo personalizado para el payload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    // Extraer el userId del token
    const userId = decoded.userId;

    // Token válido - Devolver el estado de validez y el userId
    return new Response(JSON.stringify({ valid: true, userId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Token no válido o error en la verificación
    return new Response(
      JSON.stringify({ valid: false, message: "Invalid token" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
