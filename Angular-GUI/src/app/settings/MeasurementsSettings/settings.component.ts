import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public MeasurementNumber: number = 5;
  public GUINumber: number = 5;
  snackbarDurationInSeconds = 5;


  constructor( private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  Measurements(action: boolean) {
    if (this.MeasurementNumber >= 0) {
      if(action == true) {
        this.MeasurementNumber += 1;
        console.log(this.MeasurementNumber);
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
        console.log(this.GUINumber, "GUINumber");
      } else {
        if (this.GUINumber > 1) {
          this.GUINumber -= 1;
          console.log(this.GUINumber, "GUINumber");
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };
}
