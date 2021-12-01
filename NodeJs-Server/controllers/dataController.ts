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
            //const data = await this.dataService.getData(req.params.name);
            res.status(501).send("Not implemented yet");
        } catch (error) {
            next(error);
        }
    }

    public async saveData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const waitTime = await this.dataService.saveData(req.body.data);
            res.send({waitTime: waitTime});
        } catch (error) {
            next(error);
        }
    }
}