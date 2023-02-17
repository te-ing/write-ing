import { AppDataSource } from '@/data-source';
import Post from '@/entities/Post';
import { Request, Response, Router } from 'express';
import { isEmpty, validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { User } from '@/entities/User';
import userMiddleware from '@/middlewares/user';
import authMiddleware from '@/middlewares/auth';
import { decodeRSA, encodeHash, encodeRSA } from '@/utils/security';

const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints[0][1]);
    return prev;
  });
};

const publicKey = async (_: Request, res: Response) => {
  try {
    return res.status(200).json(process.env.RSA_PUBLIC_KEY);
  } catch (error) {
    console.error(error);
    return res.status(500).json('암호키를 불러오는데 실패했습니다.');
  }
};

const register = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  try {
    let errors: any = {};

    // 이메일과 유저이름이 이미 사용중인지 확인
    const emailUser = await User.findOneBy({ email });

    // 이미 있다면 errors 객체에 넣어줌
    if (emailUser) errors.email = '이미 해당 이메일 주소가 사용되었습니다.';

    // 에러가 있다면 return으로 에러를 반환
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const user = new User();
    user.email = email;
    user.nickname = nickname;
    user.password = encodeHash(decodeRSA(password));

    // 엔티티에 정해 놓은 조건으로 user 데이터의 유효성 검사를 해줌.
    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(mapError);

    // 유저 정보를 user table에 저장
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let errors: any = {};
    // 비워져있다면 에러를 프론트엔드로 보내주기
    if (isEmpty(password)) errors.password = '비밀번호는 비워둘 수 없습니다';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // 디비에서 유저 찾기
    const user = await User.findOneBy({ email });

    if (!user) return res.status(404).json({ email: '사용자가 등록되지 않았습니다.' });

    // 유저가 있다면 비밀번호 비교하기
    const passwordMatches = await bcrypt.compare(decodeRSA(password), user.password);

    // 비밀번호가 다르다면 에러 보내기
    if (!passwordMatches) {
      return res.status(401).json({ password: '비밀번호가 잘못되었습니다.' });
    }
    // 비밀번호가 맞다면 토큰 생성
    const token = jwt.sign({ email, nickname: user.nickname }, process.env.JWT_SECRET, { expiresIn: '6h' });
    // 쿠키저장
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
    );

    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const logout = async (_, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );
  res.status(200).json({ success: true });
};

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', userMiddleware, authMiddleware, logout);
router.get('/key', publicKey);

export default router;
