import express, { Express } from 'express';
import cors from 'cors';
import fs, { readFileSync } from "fs"
import dayjs from 'dayjs';
import mysql from 'mysql2/promise';
import { AppDataSource } from './data-source';

const app: Express = express();
const port = 8080;

app.use(cors())
app.use(express.json())

AppDataSource.initialize()
.then(() => {
}).catch((error) => console.log(error))


const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: process.env.DB_USER_ID,
  password: process.env.DB_USER_PASSWORD,
  database: 'mariadb',
  connectionLimit: 10,
  queueLimit: 0,
});


app.get('/', async (req, res) => {
  // res.send(dayjs().format('YYYY.MM.DD HH:mm:ss'));
  try {
    const postSql = "SELECT * from post";
    const connection = await pool.getConnection();
    const result = await connection.query(postSql);
    res.status(200).send(result)
  } catch {
    res.status(500).send("message : Internal Server")
  }
});
;

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
