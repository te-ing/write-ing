import { Router } from 'express';
import postRoutes from './post.router';

const router = Router();

router.get('/', (req, res) => {
  res.send('안녕하세요');
});

router.use('/post', postRoutes);

export default router;
