import {logger} from "./logger";
import * as dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI = process.env["MONGODB_URI"];

if (!MONGODB_URI) {
    logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

//export const JWT_SECRET = process.env["JWT_SECRET"];

//if (!JWT_SECRET) {
//    logger.error("No JWT secret string. Set JWT_SECRET environment variable.");
//    process.exit(1);
//}