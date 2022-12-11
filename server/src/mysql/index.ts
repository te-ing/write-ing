import sql from './sql';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  port: 3306,
  user: 'dev01',
  password: '1234',
  database: 'dev'
});

const query = async (alias, values) => {
  return new Promise((resolve, reject, callback) =>
    pool.query(sql[alias], values, (error: any,
    results: unknown) => {
    if (error) {
      console.log(error);
      reject({
        error
      });
    } else resolve(results);
  }));
}

module.exports = {
  query
}

// interface Post extends RowDataPacket {
//   id: number;
//   createdAt?: string;
//   updateddAt?: string;
//   title: string;
//   subtitle?: string;
//   content?: string;
//   status?: string;
//   tag?: string;
//   like?: any
//   comment ?: any
// }