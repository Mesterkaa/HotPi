// imports
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { SETTING } from 'src/app/helper/setting.const';
import { SettingsService } from 'src/app/services/settings/settings.service';

// Declorations
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  // properties
  public timeNumber: number = 60;

  // inject services
  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) { }


  // runs when site is accessed
  ngOnInit(): void {
    // Setting time number rigth using SETTING enum
    const time = SETTING.TIME;
    
    // running time funktion in SettingService and finde time object and setting value = to timenumber
    this.settingsService.getTime(time).subscribe((res) => {
      const TimeObject = res.find( ({ name }) => name === time );
      this.timeNumber = TimeObject?.value;
    });
  }

  // recieves a true or false from HTML file and based on that either adds or removes on from timenumber
  // also checks if timenumber is grether the 0 and 1 or it opens snackbar component
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

  // runs saveTime function in settingsservice and sends timeNumber property with it
  saveTime(timeNumber: number) {
    this.settingsService.saveTime(timeNumber);
  }
}
