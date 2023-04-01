import { AppDataSource } from '@/data-source';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import Post from '@/entities/Post';
import Comment from '@/entities/Comment';
import userMiddleware from '@/middlewares/user';
import authMiddleware from '@/middlewares/auth';

const getPostComments = async (req: Request, res: Response) => {
  const [id, commentId] = [Number(req.params.id), Number(req.params.commentId)];
  try {
    const post = await Post.findOneBy({ id });
    if (post === null) return res.json([]);
    const comments = await Comment.find({
      where: { postId: post.id },
      order: { createdAt: 'DESC' },
    });
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};

const createPostComment = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { body } = req.body;
  try {
    const post = await Post.findOneByOrFail({ id });
    const comment = new Comment();
    comment.body = body;
    comment.user = res.locals.user;
    comment.post = post;

    await comment.save();
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '게시물을 찾을 수 없습니다' });
  }
};

const deletePostComment = async (req: Request, res: Response) => {
  try {
    const results = await AppDataSource.getRepository(Comment).delete(req.params.commentId);
    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '해당 댓글을 삭제할 수 없습니다.' });
  }
};

const router = Router({ mergeParams: true });

router.get('/', getPostComments);
router.post('/', userMiddleware, authMiddleware, createPostComment);
router.post('/', userMiddleware, authMiddleware, createPostComment);
router.delete('/:commentId', userMiddleware, authMiddleware, deletePostComment);

export default router;
