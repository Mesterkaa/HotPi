import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/helper/url.const';
import { SETTING } from 'src/app/helper/setting.const';
import { ISetting } from 'src/app/interfaces/ISetting';

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getAlarmSettings(maxtemp: any, maxpres: any, maxhumi: any, mintemp: any, minpres: any, minhumi: any) {
    return this.httpClient.get<ISetting[]>(URL.SETTING.GET + "?name=" + maxtemp + "&name=" + maxpres + "&name=" + maxhumi + "&name=" + mintemp + "&name=" + minpres + "&name=" + minhumi);
  }

  getEmail(email: any) {
    return this.httpClient.get<ISetting[]>(URL.SETTING.GET + "?name=" + email);
  }

  saveAlarmSettings(mail: any) {
    const body = {
      settings: [
        {name: SETTING.ALARM_EMAIL, value: mail}
      ]
    }

    return this.httpClient.put<ISetting[]>(URL.SETTING.UPDATE, body);
  }
}
