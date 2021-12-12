// imports
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { SETTING } from 'src/app/helper/setting.const';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  // props
  public timeNumber: number = 60;
  snackbarDurationInSeconds = 5;
  time: any = [];

  // inject services
  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) { }


  // runs when site is accessed
  ngOnInit(): void {

    const timenumber = SETTING.TIME
    
    this.settingsService.getTime(timenumber).subscribe((res) => {
      const TimeObject = res.find( ({ name }) => name === SETTING.TIME );
      this.timeNumber = TimeObject?.value;
    });
  }

   setTime(action: boolean) {
    if (this.timeNumber >= 0) {
      if(action == true) {
        this.timeNumber += 1;
        console.log(this.timeNumber);
      } else {
        if (this.timeNumber > 1) {
          this.timeNumber -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  saveTime(timeNumber: number) {
    this.settingsService.saveTime(timeNumber);
  }
}
