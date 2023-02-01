import { User } from '@/entities/User';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const { nickname }: any = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOneBy({ nickname });

    if (!user) throw new Error('Unauthenticated');

    // 유저 정보를 res.local.usename에 넣어주기
    res.locals.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Something went wrong on user' });
  }
};
