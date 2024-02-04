import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User"; // Asegúrate de que la ruta sea correcta

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  // Extraer el token del header de autorización
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    // Verificar el token. Asegúrate de que JWT_SECRET esté definido en tu .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Suponiendo que el payload del token contiene el userId
    const userId = (decoded as any).userId;

    // Conectar a la base de datos y buscar el usuario
    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Devolver los puntos del usuario
    res.status(200).json({ points: user.points });
  } catch (error) {
    // Si hay un error (token inválido, problema de conexión, etc.)
    res.status(401).json({ message: "Invalid token" });
  }
}
