import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/helper/url.const';
import { SETTING } from 'src/app/helper/setting.const';

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {

  constructor(
    private httpClient: HttpClient
  ) { }
}
