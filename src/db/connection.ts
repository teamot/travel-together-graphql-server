import { createConnection } from 'typeorm';

export async function connectDB() {
  const connection = await createConnection();

  // console.log('Here you can setup and run express/koa/any other framework.');
  return connection;
}
