import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User'; // Asegúrate de que la ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const token = req.headers.authorization?.split(' ')[1]; // Bearer Token

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'JWT secret is not defined' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const userId = decoded.userId;

    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { points } = req.body;

    user.points = points; // Asegúrate de validar los puntos aquí
    await user.save();

    res.status(200).json({ message: 'Points updated successfully' });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
