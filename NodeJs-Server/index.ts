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

/**
 * The main server class.
 * Handeling all the server logic and memory.
 * A set of function configures the server.
 */
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

    /**
     * Configure the routes for the app.
     * The main routes is defined, with subroutes defined in each router.
     */
    private routes(): void{
        this.app.use("/data", new DataRoutes().router);
        this.app.use("/device", new DeviceRoutes().router);
        this.app.use("/setting", new SettingRoutes().router);
    }

    /**
     * Base configuration for express to work the way we want
     */
    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

    }
    /**
     * Connection to mongodb via Mongoose.
     * It tell to do in certain events, like losing connection.
     * It also does the first time connection
     */
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

    /**
     * Starting the server, with the http module.
     */

    public start(): void {
        const httpServer = http.createServer(this.app);
        const port: number = 3000;
        httpServer.listen(port, () => {
            logger.info(`HTTP Server running on port ${port}`);

        });
    }
}

const server = new Server();
server.start();
