import { AppDataSource } from '@/data-source';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import Post from '@/entities/Post';
import Comment from '@/entities/Comment';
import userMiddleware from '@/middlewares/user';
import authMiddleware from '@/middlewares/auth';
import { decodeRSA, encodeHash } from '@/utils/security';
import bcrypt from 'bcryptjs';

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
  const { body, nickname, encodedPassword } = req.body;

  try {
    const post = await Post.findOneByOrFail({ id });
    const comment = new Comment();
    comment.body = body;
    comment.password = encodeHash(decodeRSA(encodedPassword));
    comment.nickname = nickname;
    comment.post = post;
    await comment.save();
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '댓글 작성 중 오류가 발생했습니다.' });
  }
};

const deletePostComment = async (req: Request, res: Response) => {
  const { password } = req.body;
  const id = Number(req.params.commentId);

  try {
    const comment = await Comment.findOneBy({ id });
    if (!comment) return res.status(404).json('해당 댓글이 존재하지 않습니다.');

    const passwordMatches = await bcrypt.compare(decodeRSA(password), comment.password);
    if (!passwordMatches) return res.status(401).json('비밀번호가 잘못되었습니다.');

    const results = await AppDataSource.getRepository(Comment).delete(id);
    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '해당 댓글을 삭제할 수 없습니다.' });
  }
};

const router = Router({ mergeParams: true });

router.get('/', getPostComments);
router.post('/', createPostComment);
router.delete('/:commentId', deletePostComment);

export default router;
