import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public timeNumber: number = 60;
  snackbarDurationInSeconds = 5;
  time: any = [];

  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    this.settingsService.GetSettings().subscribe((res) => {
      this.time = res;

      this.timeNumber = this.time[4].value;

      console.log(this.time);
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
