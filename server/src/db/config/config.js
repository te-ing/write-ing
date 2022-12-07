import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: 'mysql',
    timezone: '+09:00',
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: '+09:00',
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: '+09:00',
  }
}

export default config;