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
    console.log("body", body);
    this.httpClient.put(URL.SETTING.UPDATE, body).subscribe((res) => {
      console.log(res);
    });
  }

  GetSettings() {
    return this.httpClient.get(URL.SETTING.GET_ALL)
  }
}
