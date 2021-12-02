import { NextFunction, Request, Response } from "express";
import { DataService } from "../services/dataService";

export class DataController{
    dataService: DataService = new DataService();

    constructor() {
        this.getData = this.getData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

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

    public async saveData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { temperature, air_pressure, humidity, mac} = req.body;
            const waitTime = await this.dataService.saveData(temperature, air_pressure, humidity, mac);
            res.send({waitTime: waitTime});
        } catch (error) {
            next(error);
        }
    }
}