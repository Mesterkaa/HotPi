import { NextFunction, Request, Response } from "express";
import { SettingService } from "../services/settingService";

export class SettingController{
    settingService: SettingService = new SettingService();

    constructor() {
        this.getSettings = this.getSettings.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    public async getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const settings = await this.settingService.getSettings();
            res.send(settings)
        } catch (error) {
            next(error);
        }
    }

    public async saveSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const update_frequency: number = req.body.update_frequency;
            const measurement_frequency: number = req.body.measurement_frequency;
            const settings = await this.settingService.saveSettings(update_frequency, measurement_frequency);
            res.send(settings);
        } catch (error) {
            next(error);
        }
    }
}