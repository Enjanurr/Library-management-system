import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "../core/initializer/database";
import routes from '../core/routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || "8080";


app.use('/api',routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  connectDb();
});
