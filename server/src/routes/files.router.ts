import Post from '@/entities/Post';
import { makeId } from '@/utils/helpers';
import { Request, Response, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images/post',
    filename: (_, file, callback) => {
      const name = makeId(10);
      callback(null, name + path.extname(file.originalname));
    },
  }),
  fileFilter: (_, file: any, callback: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('이미지가 아닙니다'));
    }
  },
});

const uploadPostImage = async (req: any, res: Response) => {
  try {
    req.file.originalname = encodeURI(req.file.filename);
    return res.json(req.file);
  } catch (error) {
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};
// uploadPostImage
// const uploadPostImage = async (req: any, res: Response) => {
//   console.log('uploadPostImage start');
//   try {
//     const post: Post = await Post.findOne({
//       where: { title: req.params.name },
//     });
//     post.imageUrn = JSON.stringify(JSON.parse(post.imageUrn).concat(req.file?.filename));
//     await post.save();

//     return res.json(post);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: '문제가 발생했습니다.' });
//   }
// };

const router = Router();

router.post('/upload/image/post', upload.single('file'), uploadPostImage);
export default router;
