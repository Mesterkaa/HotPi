import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public MeasurementNumber: number = 5;
  public GUINumber: number = 5;
  snackbarDurationInSeconds = 5;
  settings: any = []



  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settingsService.GetSettings().subscribe((res) => {
      this.settings = res;

      this.GUINumber = this.settings[0].value;
      this.MeasurementNumber = this.settings[1].value

      console.log(this.settings);
    });
  }

  Measurements(action: boolean) {
    if (this.MeasurementNumber >= 0) {
      if(action == true) {
        this.MeasurementNumber += 1;
      } else {
        if (this.MeasurementNumber > 1) {
          this.MeasurementNumber -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  GUI(action: boolean) {
    if (this.GUINumber >= 0) {
      if(action == true) {
        this.GUINumber += 1;
      } else {
        if (this.GUINumber > 1) {
          this.GUINumber -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  saveSettings(guinum: number, meaNumber: number) {
    this.settingsService.saveSettings(guinum, meaNumber);
  }
}
