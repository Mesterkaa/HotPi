import { NextFunction, Request, Response } from "express";
import { SettingService } from "../services/settingService";

export class SettingController{
    settingService: SettingService = new SettingService();

    constructor() {
        this.getSettings = this.getSettings.bind(this);
        this.getSetting = this.getSetting.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    /**
     * Gets all settings stored in the db
     * @param req 
     * @param res 
     * @param next 
     */
    public async getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const settings = await this.settingService.getSettings();
            res.send(settings)
        } catch (error) {
            next(error);
        }
    }

        /**
     * Gets one setting based on the name.
     * @param req query ?name=type&name=devices
     * @param res 
     * @param next 
     */
    public async getSetting(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const names: string[] = (req.query.name as string[]);
            const settings = await this.settingService.getSetting(names);
            res.send(settings)
        } catch (error) {
            next(error);
        }
    }


    /**
     * Updates the setting based on the new values.
     * @param req body = { "settings": [ {"name": "type", "value": "temp"} ] }
     * @param res 
     * @param next 
     */
    public async saveSettings({body: {settings}}: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const docs = await this.settingService.saveSettings(settings);
            res.send(docs);
        } catch (error) {
            next(error);
        }
    }
}