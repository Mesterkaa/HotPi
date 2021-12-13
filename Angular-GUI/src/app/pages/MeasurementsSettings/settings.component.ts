// imports
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { SETTING } from 'src/app/core/const/setting.const';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

// Declorations
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // properties
  public MeasurementNumber: number = 5;
  public GUINumber: number = 5;

  // Inject services
  constructor(
    private _snackBar: MatSnackBar,
    private settingsService: SettingsService
  ) { }

  // runs when site is accessed
  ngOnInit() {

    // Setting MeasurementNumber and GUINumber rigth using SETTING enum
    const measurementFreq = SETTING.M_FREQ;
    const Updatefreq = SETTING.U_FREQ;

    // running getSpecificSettings funktion in SettingService
    // and finds MeasurementSpeedObject object and setting value = to MeasurementNumber
    // and does the same with GUINumber
    this.settingsService.getSpecificSettings(measurementFreq, Updatefreq).subscribe((res) => {
      const MeasurementSpeedObject = res.find( ({ name }) => name === SETTING.M_FREQ );
      this.MeasurementNumber = MeasurementSpeedObject?.value;
      console.log(this.MeasurementNumber);

      const GUIMeasurementSpeedObject = res.find( ({ name }) => name === SETTING.U_FREQ );
      this.GUINumber = GUIMeasurementSpeedObject?.value;
      console.log(this.GUINumber);
    });
  }

  // recieves a true or false from HTML file and based on that either adds or removes on from MeasurementNumber
  // also checks if MeasurementNumber is grether the 0 and 1 or it opens snackbar component
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

  // recieves a true or false from HTML file and based on that either adds or removes on from GUINumber
  // also checks if GUINumber is grether the 0 and 1 or it opens snackbar component
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

  // runs saveTime function in settingsservice and sends GUINumber and MeasurementNumber property with it
  saveSettings(guinum: number, meaNumber: number) {
    this.settingsService.saveSettings(guinum, meaNumber);
  }
}
