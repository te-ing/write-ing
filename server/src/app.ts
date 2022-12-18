import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import fs, { readFileSync } from "fs"
import dayjs from 'dayjs';
import mysql from 'mysql2/promise';
import { AppDataSource } from './data-source';

const app: Express = express();
const port = 8080;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(dayjs().format('YYYY.MM.DD HH:mm:ss'));
});

AppDataSource.initialize()
.then(() => {
}).catch((error) => console.log(error))

app.get('/posts', (req, res) => {
  try {
    const articleDir = fs.readdirSync('article'); // 디렉토리를 읽어온다
    const article = articleDir.map((file) => JSON.parse((readFileSync(`article/${file}`, { encoding: 'utf8'})).toString()));
    res.json({ ok: true, article });
  } catch (err) {
    res.status(500).send('요청을 처리할 수 없습니다.');
  }
});

app.get('/post/:id', (req, res) => {
  try {
    fs.stat(`article/${req.params.id}.json`, async (err, stats) => {
      const article = JSON.parse(fs.readFileSync(`article/${req.params.id}.json`, { encoding: 'utf8', flag: 'r' }));
      res.json({ ok: true, article });
    });
  } catch (err){
    res.status(500).send('요청을 처리할 수 없습니다. ');
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});

/**

app.post('/post', (req, res) => {
  // const { writeTime, title, content } = req.body.data.content;
  const reqData = req.body.data.content;
  const Post = {
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
 */
