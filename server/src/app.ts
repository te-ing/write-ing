import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import fs from "fs"
import dayjs from 'dayjs';
import { PostEditType, PostType } from './types/post';
import { subtle } from 'crypto';
import mysql from 'mysql2/promise';

const app: Express = express();
const port = 8080;

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send(dayjs().format('YYYY.MM.DD HH:mm:ss'));
});

app.get('/api/post', async (req: Request, res: Response) => {
  const post = await mysql.query('postList');
  res.send(post);
})

app.get('/post', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server');
});

app.post('/post', (req: Request, res) => {
  // const { writeTime, title, content } = req.body.data.content;
  const reqData: PostEditType = req.body.data.content;
  const Post: PostType = {
    id: 1,
    createdAt: dayjs().format('YYYY.MM.DD HH:mm:ss'),
    updatedAt: dayjs().format('YYYY.MM.DD HH:mm:ss'),
    subtitle: reqData.subtitle || reqData.content.slice(0, 30),
    like: [],
    comment: [],
    ...reqData
  }   


  res.send('Got a POST request')
  fs.writeFile(`../client/article/${reqData.title}.JSON`, JSON.stringify(Post), (err) => console.log(err));
})

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});

