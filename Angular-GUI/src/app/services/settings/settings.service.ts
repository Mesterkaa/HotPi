import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/helper/url.const';
import { SETTING } from 'src/app/helper/setting.const';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private httpClient: HttpClient) { }

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

  GetSettings() {
    return this.httpClient.get(URL.SETTING.GET_ALL)
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
