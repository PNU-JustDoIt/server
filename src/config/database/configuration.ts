import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  // host: 'just-do-it.crxa4uhj4zzw.us-east-2.rds.amazonaws.com',
  // port: 3306,
  // username: 'admin',
  // password: 'akwldrk12',
  // database: 'just_do_it',
  host: process.env.AWS_DB_HOST,
  port: process.env.AWS_DB_PORT,
  username: process.env.AWS_DB_USERNAME,
  password: process.env.AWS_DB_PASSWORD,
  database: process.env.AWS_DB_DATABASE,
}));
