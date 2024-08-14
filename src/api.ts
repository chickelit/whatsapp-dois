import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import http from "http";
import { dataSource } from "./database/data-source";
import { expressAsyncErrorsMiddleware } from "./middleware/expressAsyncErrors.middleware";
import { router } from "./routes";
import { Server } from "socket.io";

let instance: Application;
let socketIO: Server;

export class Api {
  public socket!: Server;

  constructor() {}

  initialize() {
    if (!instance) {
      const app = express();
      const port = +process.env.PORT! || 3333;
      const server = http.createServer(app);

      app.use(express.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(
        cors({
          origin: "*",
        })
      );
      app.use("/v1", router);
      app.use(expressAsyncErrorsMiddleware);

      const socket = new Server(server);

      server.listen(port, async () => {
        try {
          const conn = await mysql.createConnection({
            host: process.env.DB_HOST!,
            port: +process.env.DB_PORT!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASS!,
          });

          await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME!};`);
          await conn.end();

          await dataSource.initialize();

          console.log(`App listening on port ${port}`);
        } catch (error) {
          console.error(error);

          process.exit(1);
        }
      });

      instance = app;
      socketIO = socket;
      this.socket = socket;
    }

    return {
      api: instance!,
      socket: socketIO!,
    };
  }
}
