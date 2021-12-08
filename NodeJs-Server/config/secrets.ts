import {logger} from "./logger";
import * as dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI = process.env["MONGODB_URI"];

if (!MONGODB_URI) {
    logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

export const MAIL_HOST = process.env["MAIL_HOST"];

if (!MAIL_HOST) {
    logger.error("No Gmail user. Set MAIL_HOST environment variable.");
    process.exit(1);
}

export const MAIL_USER = process.env["MAIL_USER"];

if (!MAIL_USER) {
    logger.error("No Gmail user. Set MAIL_USER environment variable.");
    process.exit(1);
}

export const MAIL_PASS = process.env["MAIL_PASS"];

if (!MAIL_PASS) {
    logger.error("No Gmail password. Set MAIL_PASS environment variable.");
    process.exit(1);
}

//export const JWT_SECRET = process.env["JWT_SECRET"];

//if (!JWT_SECRET) {
//    logger.error("No JWT secret string. Set JWT_SECRET environment variable.");
//    process.exit(1);
//}