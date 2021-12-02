import { ISetting, Setting } from "../models/setting";

export class SettingService {
    async getSettings(): Promise<ISetting> {
        return (await Setting.find({}))[0];
    }

    async saveSettings(update_frequency: number, measurement_frequency: number): Promise<ISetting> {
        let setting = (await Setting.find({}))[0];
        if (setting) {
            setting.update_frequency = update_frequency;
            setting.measurement_frequency = measurement_frequency;
            await setting.save();
            return setting;
        } else {
            throw new Error("An error had happend?");
        }

    }

    async initSettings(): Promise<void> {
        let setting = (await Setting.find({}))[0];
        if (!setting) {
            await Setting.create({update_frequency: 5, measurement_frequency: 30});
        }
    }
}