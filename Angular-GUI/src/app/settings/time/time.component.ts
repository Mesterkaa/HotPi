import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public timeNumber: number = 60;
  snackbarDurationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
}
