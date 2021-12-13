import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SETTING } from 'src/app/core/const/setting.const';
import { URL } from 'src/app/core/const/url.const';
import { IMeasurement } from 'src/app/core/interfaces/IMeasurement';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _data: BehaviorSubject<IMeasurement[]> = new BehaviorSubject<IMeasurement[]>([]);
  public readonly data: Observable<IMeasurement[]> = this._data.asObservable();

  private delay: number = 5;

  constructor(private settingsService: SettingsService, private httpClient: HttpClient) {
    this.settingsService.settings.subscribe(settings => {
      this.delay = settings[SETTING.U_FREQ];
    })
    this.updateLoop();
  }

  private async updateLoop() {
    this.httpClient.get<IMeasurement[]>(URL.DATA.GET).subscribe(async result => {
      this._data.next(result);
      await new Promise(f => setTimeout(f, this.delay * 1000));
      this.updateLoop();
    })
  }



}
