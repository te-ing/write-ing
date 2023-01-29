import { Router } from 'express';
import postRoutes from './post.router';
import filesRoutes from './files.router';
import authRoutes from './auth.router';

const router = Router();

router.get('/', (req, res) => {
  res.send('안녕하세요');
});

router.use('/post', postRoutes);
router.use('/files', filesRoutes);
router.use('/auth', authRoutes);

export default router;
