import { Router } from 'express';
import postRoutes from './post.router';
import filesRoutes from './files.router';
import authRoutes from './auth.router';
import commentsRoutes from './comments.router';

const router = Router();

router.get('/', (req, res) => {
  res.send('안녕하세요');
});

router.use('/post', postRoutes);
router.use('/comments', commentsRoutes);
router.use('/files', filesRoutes);
router.use('/auth', authRoutes);

export default router;
