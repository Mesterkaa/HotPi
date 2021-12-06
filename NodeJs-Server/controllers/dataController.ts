import { NextFunction, Request, Response } from "express";
import { DataService } from "../services/dataService";

export class DataController{
    dataService: DataService = new DataService();

    constructor() {
        this.getData = this.getData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    /**
     * Gets measurement data.
     * @param req
     * @param res 
     * @param next 
     */
    public async getData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try { const data = await this.dataService.getData();
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