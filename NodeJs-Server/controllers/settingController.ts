import { NextFunction, Request, Response } from "express";
//import { DataService } from "../services/dataService";

export class SettingController{
    //dataService: DataService = new DataService();

    constructor() {
        this.getSettings = this.getSettings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    public async getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            //const data = await this.dataService.getData(req.params.name);
            res.status(501).send("Not implemented yet");
        } catch (error) {
            next(error);
        }
    }

    public async saveSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            //const newWaitTime = await this.dataService.saveData(req.body.data);
            res.status(501).send("Not implemented yet");
        } catch (error) {
            next(error);
        }
    }
}