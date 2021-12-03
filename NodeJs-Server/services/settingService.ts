import { ISetting, Setting } from "../models/setting";

export class SettingService {
    /**
     * Gets all setting stored in the database.
     * @returns A single document containing all the settings.
     */
    async getSettings(): Promise<ISetting> {
        return (await Setting.find({}))[0];
    }

    /**
     * Gets an array of settings.
     * @param names An array of names to search for
     * @returns Array of Settings
     */
    async getSetting(names: string[]): Promise<ISetting[]> {
        return await Setting.find({name: {$in: names}});
    }

    /**
     * Updates the settings in the database. If the name doesn't yet is in the database, it creates the document.
     * @param settings array of a name - value pair
     * @returns 
     */
    async saveSettings(settings: {name: string, value: any}[]): Promise<ISetting[]> {
        let newSettings: ISetting[] = [];
        await Promise.all(settings.map(async ({name, value}) => {
            let setting = (await Setting.find({name: name}))[0];
            if (setting) {
                setting.value = value;
                await setting.save();
                newSettings.push(setting);
            } else {
                newSettings.push(await Setting.create({name: name, value: value}));
            }
        }));
        return newSettings;
        
        

    }

    async initSettings(): Promise<void> {
        let setting = (await Setting.find({}))[0];
        if (!setting) {
            await Setting.create({update_frequency: 5, measurement_frequency: 30});
        }
    }
}