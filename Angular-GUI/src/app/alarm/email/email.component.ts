import { Component, OnInit } from '@angular/core';
import { SETTING } from 'src/app/helper/setting.const';
import { AlarmsService } from 'src/app/services/alarms/alarms.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public email: any;
  public seperatedarray = []
  public addedEmail: any;

  constructor(
    private alarmService: AlarmsService
  ) { }

  ngOnInit(): void {
    const email = SETTING.ALARM_EMAIL
    this.alarmService.getEmail(email).subscribe((res) => {
      console.log(res);
      const emailObject = res.find( ({ name }) => name === SETTING.ALARM_EMAIL );
      this.email = emailObject?.value;
      this.seperatedarray = this.email.split(',')
    });
  }

  saveEmail() {
    console.log(this.addedEmail)

    this.alarmService.saveAlarmSettings(this.addedEmail).subscribe((res) => {
      console.log(res);
    })
  }
}
