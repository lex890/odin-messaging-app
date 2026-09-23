import express, { type Express, type Request, type Response } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";


export function app() {
  const app: Express = express();



  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Testing app listening on port ${port}`);
  });
}

