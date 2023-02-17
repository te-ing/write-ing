import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import apiRouter from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const origin = process.env.ORIGIN;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
dotenv.config();

app.get('/', (_, res) => res.send('running'));
app.use('/api', apiRouter);

let port = process.env.PORT;

app.listen(port, async () => {
  console.log(`server running at ${process.env.APP_URL} port`);
  AppDataSource.initialize()
    .then(async () => {
      console.log('database initialized...');
    })
    .catch((error) => console.log(error));
});
