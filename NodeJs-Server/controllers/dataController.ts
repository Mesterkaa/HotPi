import { NextFunction, Request, Response } from "express";
import { DataService } from "../services/dataService";

export class DataController{
    dataService: DataService = new DataService();

    constructor() {
        this.getData = this.getData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    /**
     * Gets data based on query parameters.
     * @param req example: ?type=air_pressure&time=2021-12-01T11:20:07.662Z&devices=61a748ca8ee7e608bb34f361&devices=61a75a6778e6ba98f2dd9b3e
     * @param res 
     * @param next 
     */
    public async getData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const time = new Date((req.query.time as string))
            const type = (req.query.type as string)
            const devices = (req.query.devices as string[])

            const data = await this.dataService.getData(time, type, devices);
            res.send(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Saves a new measurement. Takes a set of data with a mac-address
     * @param req body = { temperature, air_pressure, humidity, mac}
     * @param res 
     * @param next 
     */
    public async saveData({body: { temperature, air_pressure, humidity, mac}}: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const waitTime = await this.dataService.saveData(temperature, air_pressure, humidity, mac);
            res.send({waitTime: waitTime});
        } catch (error) {
            next(error);
        }
    }
}