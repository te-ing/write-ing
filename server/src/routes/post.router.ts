import { AppDataSource } from '@/data-source';
import Post from '@/entities/Post';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';

const router = Router();

const getPostDetail = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  try {
    const post = await Post.findOneByOrFail({ id: postId });
    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '해당 게시글을 찾을 수 없습니다.' });
  }
};

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

const deletePost = async (req: Request, res: Response) => {
  try {
    const results = await AppDataSource.getRepository(Post).delete(req.params.id);
    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '해당 게시글을 삭제할 수 없습니다.' });
  }
};

router.get('/list', getPostList);
router.get('/:id', getPostDetail);
router.post('/create', createPost);
router.delete('/:id', deletePost);

export default router;
