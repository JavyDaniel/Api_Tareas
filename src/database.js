import {createPool} from "mysql2/promise.js";
import {DB_HOST, DB_PORT, DB_USER, DB_DATABASE, DB_PASSWORD} from "./config.js";

export const conn = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})