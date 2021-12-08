import { SETTING } from "../lib/settings";
import { ISetting, Setting } from "../models/setting";

export class SettingService {
    /**
     * Gets all setting stored in the database.
     * @returns A single document containing all the settings.
     */
    async getSettings(): Promise<ISetting[]> {
        return await Setting.find({});
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

    /**
     * Makes sure all default settings.
     */
    async initSettings(): Promise<void> {
        
        let init = (name: string, value: any) => {
            Setting.exists({name: name}).then(result => {
                if (!result){
                    Setting.create({name: name, value: value})
                }
            })
        }

        init(SETTING.TIME, 60);
        init(SETTING.DEVICES, []);
        init(SETTING.TYPE, "temperature");
        init(SETTING.M_FREQ, 30);
        init(SETTING.U_FREQ, 5);

        init(SETTING.MAX_TEMP, 40);
        init(SETTING.MIN_TEMP, 10);

        init(SETTING.MAX_HUMI, 60);
        init(SETTING.MIN_HUMI, 30);

        init(SETTING.MAX_PRES, 1040);
        init(SETTING.MIN_PRES, 960);

        init(SETTING.ALARM_EMAIL, "");
    }
}