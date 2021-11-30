import { NextFunction, Request, Response } from "express";
//import { DataService } from "../services/dataService";

export class DeviceController{
    //dataService: DataService = new DataService();

    constructor() {
        this.getDevices = this.getDevices.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    public async getDevices(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            //const data = await this.dataService.getData(req.params.name);
            res.status(501).send("Not implemented yet");
        } catch (error) {
            next(error);
        }
    }

    public async updateName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            //const newWaitTime = await this.dataService.saveData(req.body.data);
            res.status(501).send("Not implemented yet");
        } catch (error) {
            next(error);
        }
    }
}