import { AppDataSource } from '@/data-source';
import Post from '@/entities/Post';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import userMiddleware from '@/middlewares/user';
import Comment from '@/entities/Comment';

const getPostComments = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const post = await Post.findOneBy({ id });
    if (post === null) return res.json([]);
    const comments = await Comment.find({
      where: { postId: post.id },
      order: { createdAt: 'DESC' },
    });
    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};

const createPostComment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  console.log(data);
  try {
    const post = await Post.findOneByOrFail({ id });
    const comment = new Comment();
    comment.body = 'test';
    comment.user = res.locals.user;
    comment.post = post;
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '게시물을 찾을 수 없습니다' });
  }
};

const router = Router();

router.get('/:id', userMiddleware, getPostComments);
router.post('/:id', userMiddleware, createPostComment);

export default router;
