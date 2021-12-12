import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/helper/url.const';
import { SETTING } from 'src/app/helper/setting.const';
import { ISetting } from 'src/app/interfaces/ISetting';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //Private setting variable that stores the settings. (Not really needed) + Plus observable so the pages can reach it.
  private localSetting: {[key in SETTING]?: any} = {}
  private _settings: BehaviorSubject<{[key in SETTING]?: any}> = new BehaviorSubject<{[key in SETTING]?: any}>({});
  public readonly settings: Observable<{[key in SETTING]?: any}> = this._settings.asObservable();

  constructor(private httpClient: HttpClient) {
    //Loads all the settings from the database and stores them in the private
    this.httpClient.get<ISetting[]>(URL.SETTING.GET_ALL).subscribe(res => {
      res.forEach(e => {
        this.localSetting[e.name] = e.value
      })
      //The settings is then pushed to the subscribers
      this._settings.next(this.localSetting);
    })

   }

  /**
   * Saves an array of settings to the server.
   * @param settings Settings to save
   */
  save(settings: {name: SETTING, value: any}[]) {
    this.httpClient.put<ISetting[]>(URL.SETTING.UPDATE, {
      settings: settings
    }).subscribe(res => {
      res.forEach(({name, value}) => {
        this.localSetting[name] = value;
      })
      this._settings.next(this.localSetting);
    })
  }

  saveSettings(guinum: number, meaNumber: number) {
    const body = {
      settings: [
        {name: SETTING.M_FREQ, value: meaNumber},
        {name: SETTING.U_FREQ, value: guinum}
      ]
    }
    this.httpClient.put(URL.SETTING.UPDATE, body).subscribe((res) => {
      console.log(res);
    });
  }

  // henter alle settings og outputter det i en array
  GetSettings() {
    return this.httpClient.get(URL.SETTING.GET_ALL);
  }

  getSpecificSettings(measurementFreq: any, Updatefreq: any) {
    return this.httpClient.get<ISetting[]>(URL.SETTING.GET + "?name=" + measurementFreq + "&name=" + Updatefreq);
  }

  getTime(time: any) {
    return this.httpClient.get<ISetting[]>(URL.SETTING.GET + "?name=" + time);
  }

  saveTime(timeNumber: number) {
    const time = {
      settings: [
        {name: SETTING.TIME, value: timeNumber}
      ]
    }
    console.log("time", time);
    this.httpClient.put(URL.SETTING.UPDATE, time).subscribe((res) => {
      console.log(res);
    });
  }
}
