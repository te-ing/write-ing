import Post from '@/entities/Post';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';

const router = Router();

const getPost = async (req: Request, res: Response) => {
  // try {
  let errors: any = {};
  const posts = await Post.find();
  // if (!posts.length) errors.error = '포스트가 존재하지 않습니다.';
  // if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  return res.json(posts);
  // } catch {
  //   res.status(500).send('message : Internal Server');
  // }
};

const createPost = async (req: Request, res: Response) => {
  const { title, subtitle, content, status, tag } = req.body.payload;
  try {
    let errors: any = {};
    const prevPost = await Post.findOneBy({ title });
    if (!prevPost) errors.title = '동일한 제목의 글이 존재합니다.';

    const post = new Post();
    post.createdAt = new Date();
    post.updatedAt = new Date();
    post.title = title;
    post.subtitle = subtitle;
    post.content = content;
    post.status = status;

    // 엔티티에 정해 놓은 조건으로 user 데이터 유효성 검사
    errors = await validate(post);
    await post.save();

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

router.get('/', getPost);
router.post('/', createPost);

export default router;
