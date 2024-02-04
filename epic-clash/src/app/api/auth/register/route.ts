import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ message: "Username and password are required" }),
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "Username already taken" }), {
      status: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ username, password: hashedPassword, points: 0 });

  try {
    await user.save();
    const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      jwtSecret,
      { expiresIn: "1h" }
    );

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${token}; Path=/; HttpOnly`);
    return new Response(JSON.stringify({ token }), { status: 201, headers });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
