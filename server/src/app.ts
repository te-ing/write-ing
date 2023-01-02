import express, { Express } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import router from './routes/index';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 8080;
const origin = 'http://localhost:3000';

app.use(
  cors({
    origin,
  })
);
app.use(express.json());
app.use('/api', router);

app.listen(port, async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('database initialized');
    })
    .catch((error) => console.log(error));
});
