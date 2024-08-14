require("dotenv").config();

import mysql from "mysql2/promise";
import { dataSource } from "./database/data-source";
import { Api } from "./api";

const api = new Api();

{
  (async () => {
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

      api.initialize();
    } catch (error) {
      console.error(error);

      process.exit(1);
    }
  })();
}

export const socket = api.socket;
