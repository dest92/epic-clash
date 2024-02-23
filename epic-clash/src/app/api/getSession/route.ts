import { NextApiRequest, NextApiResponse } from "next/types";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";

import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const headerList = headers();
  const token = headerList.get("authorization");

  if (!token || token === null) {
    return NextResponse.json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Suponiendo que el payload del token contiene el userId
    const userId = (decoded as any).userId;

    // Conectar a la base de datos y buscar el usuario
    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      //   res.status(404).json({ message: "User not found" });
      console.log("User not found");
      return;
    }

    // Devolver los puntos del usuario
    return NextResponse.json({
      username: user.username,
      points: user.points,
      id: user._id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token or error" },
      { status: 401 }
    );
  }
}
