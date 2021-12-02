import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';

import * as mongoose from 'mongoose';

import {logger} from "./config/logger"
import { MONGODB_URI } from "./config/secrets";
import { DataRoutes } from './routes/dataRoutes';
import { DeviceRoutes } from './routes/deviceRoutes';
import { SettingRoutes } from './routes/settingRoutes';
import { SettingService } from './services/settingService';

class Server {


    public app: express.Application;
    public settingService: SettingService = new SettingService();

    constructor() {

        this.app = express();
        this.config();
        this.mongo();
        this.routes();
        this.settingService.initSettings();
    }

    private routes(): void{
        this.app.use("/data", new DataRoutes().router);
        this.app.use("/device", new DeviceRoutes().router);
        this.app.use("/setting", new SettingRoutes().router);
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

    }
    private mongo(): void {
        const connection = mongoose.connection;
        connection.on("connected", () => {
            logger.info("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            logger.info("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            logger.warn("Mongo Connection Disconnected");
            logger.warn("Trying to reconnect to Mongo ...");
            setTimeout(()=> {
                mongoose.connect((MONGODB_URI as string), {
                  keepAlive: true,
                  socketTimeoutMS: 3000, connectTimeoutMS: 3000,
                  useNewUrlParser: true, useUnifiedTopology: true
                } as mongoose.ConnectOptions);
              }, 3000)
        });
        connection.on("close", () => {
            logger.info("Mongo Connection Closed");
        });
        connection.on("error", (error: Error) => {
            logger.error("Mongo Connection ERROR: " + error)
        });

        const run = async () => {

            await mongoose.connect((MONGODB_URI as string), {
                keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true
              } as mongoose.ConnectOptions);
            };
        run().catch(error => logger.error(error));
    }
    public start(): void {
        const httpServer = http.createServer(this.app);

        httpServer.listen(3000, () => {
            logger.log('info', 'HTTP Server running on port 3000');

        });
    }
}

const server = new Server();
server.start();
