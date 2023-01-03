import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import apiRouter from './routes';
import cors from 'cors';
import dotenv from 'dotenv';

const origin = process.env.ORIGIN;

const app = express();
app.use(
  cors({
    origin,
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
  console.log(`server running at http//localhost:${port} port`);
  AppDataSource.initialize()
    .then(async () => {
      console.log('database initialized...');
    })
    .catch((error) => console.log(error));
});
