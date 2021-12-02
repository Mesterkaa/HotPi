import { NextFunction, Request, Response } from "express";
import { DeviceService } from "../services/deviceService";

export class DeviceController{
    deviceService: DeviceService = new DeviceService();

    constructor() {
        this.getDevices = this.getDevices.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    public async getDevices(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const devices = await this.deviceService.getDevices();
            res.send(devices);
        } catch (error) {
            next(error);
        }
    }

    public async updateName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let _id: string = req.body._id;
            let name: string = req.body.name;
            const device = await this.deviceService.updateName(_id, name);
            res.send(device);
        } catch (error) {
            next(error);
        }
    }
}