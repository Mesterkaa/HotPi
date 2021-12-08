import { SETTING } from "lib/settings";
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
        Setting.exists({name: SETTING.TIME}).then(result => {
            if (!result){
                Setting.create({name: SETTING.TIME, value: 60})
            }
        })
        Setting.exists({name: SETTING.DEVICES}).then(result => {
            if (!result){
                Setting.create({name: SETTING.DEVICES, value: []})
            }
        })
        Setting.exists({name: SETTING.TYPE}).then(result => {
            if (!result){
                Setting.create({name: SETTING.TYPE, value: "temperature"})
            }
        })
        Setting.exists({name: SETTING.M_FREQ}).then(result => {
            if (!result){
                Setting.create({name: SETTING.M_FREQ, value: "30"})
            }
        })
        Setting.exists({name: SETTING.U_FREQ}).then(result => {
            if (!result){
                Setting.create({name: SETTING.U_FREQ, value: "5"})
            }
        })
    }
}