import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SETTING } from 'src/app/helper/setting.const';
import { AlarmsService } from 'src/app/services/alarms/alarms.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {

  public currentEmails: string = "";
  public newEmails: string = "";

  private subscription: Subscription = Subscription.EMPTY
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.subscription = this.settingsService.settings.subscribe(settings => {
      this.currentEmails = settings[SETTING.ALARM_EMAIL];
      this.newEmails = settings[SETTING.ALARM_EMAIL];
    })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  save() {
    this.settingsService.save([{name: SETTING.ALARM_EMAIL, value: this.newEmails}])
  }
}
