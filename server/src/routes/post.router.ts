import { AppDataSource } from '@/data-source';
import Post from '@/entities/Post';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';

const router = Router();

const getPostList = async (req: Request, res: Response) => {
  try {
    const posts = await AppDataSource.createQueryBuilder().from(Post, 'p').orderBy(`"createdAt"`, 'DESC').execute();

    return res.send(posts);
  } catch (error) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }
};

const createPost = async (req: Request, res: Response) => {
  const { title, subtitle, nickname, status, content, category, tag } = req.body.payload;
  if (title.trim() === '') {
    return res.status(400).json({ title: '제목은 비워둘 수 없습니다.' });
  }

  try {
    const post = new Post();
    post.title = title;
    post.subtitle = subtitle;
    post.nickname = nickname;
    post.status = status;
    post.content = content;
    post.category = category;
    post.tag = tag;

    await post.save();

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};

router.get('/list', getPostList);
router.post('/create', createPost);

export default router;
