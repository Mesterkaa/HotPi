import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { SETTING } from 'src/app/helper/setting.const';
import { MatSnackBar } from '@angular/material/snack-bar'
import { AlarmsService } from 'src/app/services/alarms/alarms.service';
import { ISetting } from 'src/app/interfaces/ISetting';

@Component({
  selector: 'app-min-max',
  templateUrl: './min-max.component.html',
  styleUrls: ['./min-max.component.scss']
})
export class MinMaxComponent implements OnInit {

  public TempMax: any = 5;
  public TempMin: any = 5;
  public HumiMax: any = 5;
  public HumiMin: any = 5;
  public PresMin: any = 5;
  public PresMax: any = 5;
  alarmsettings: ISetting[] = []

  constructor(
    private settingsService: SettingsService,
    private AlarmService: AlarmsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const maxtemp = SETTING.MAX_TEMP;
    const maxpres = SETTING.MAX_PRES;
    const maxhumi = SETTING.MAX_HUMI;
    const mintemp = SETTING.MIN_TEMP;
    const minpres = SETTING.MIN_PRES;
    const minhumi = SETTING.MIN_HUMI;

    this.AlarmService.getAlarmSettings(maxtemp, maxpres, maxhumi, mintemp, minpres, minhumi).subscribe((res) => {
      const tempMaxObject = res.find( ({ name }) => name === SETTING.MAX_TEMP );
      this.TempMax = tempMaxObject?.value;
      console.log(tempMaxObject?.value, "MAxtemp");

      const tempMinObjekt = res.find( ({ name }) => name === SETTING.MIN_TEMP );
      this.TempMin = tempMinObjekt?.value;
      console.log(this.TempMin, "MinTemp");
      
      const humMaxObject = res.find( ({ name }) => name === SETTING.MAX_HUMI );
      this.HumiMax = humMaxObject?.value;
      console.log(this.HumiMax, "hum max");
      
      const humMinObject = res.find( ({ name }) => name === SETTING.MIN_HUMI );
      this.HumiMin = humMinObject?.value;
      console.log(this.HumiMin, "hum min");
      
      const presMaxObject = res.find( ({ name }) => name === SETTING.MAX_PRES );
      this.PresMax = presMaxObject?.value;
      console.log(this.PresMax, "PresMAx");
      
      const presMinObject = res.find( ({ name }) => name === SETTING.MIN_PRES );
      this.PresMin = presMinObject?.value;
      console.log(this.PresMin, "Presmin");
    });
  }

  
  Temp(action: boolean) {
    if (this.TempMin >= 0) {
      if(action == true) {
        this.TempMin += 1;
      } else {
        if (this.TempMin > 1) {
          this.TempMin -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  TempMaxi(action: boolean) {
    if (this.TempMax >= 0) {
      if(action == true) {
        this.TempMax += 1;
      } else {
        if (this.TempMax > 1) {
          this.TempMax -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  Hum(action: boolean) {
    if (this.HumiMin >= 0) {
      if(action == true) {
        this.HumiMin += 1;
      } else {
        if (this.HumiMin > 1) {
          this.HumiMin -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  HumMaxi(action: boolean) {
    if (this.HumiMax >= 0) {
      if(action == true) {
        this.HumiMax += 1;
      } else {
        if (this.HumiMax > 1) {
          this.HumiMax -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  Pres(action: boolean) {
    if (this.PresMin >= 0) {
      if(action == true) {
        this.PresMin += 1;
      } else {
        if (this.PresMin > 1) {
          this.PresMin -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  PresMaxi(action: boolean) {
    if (this.PresMax >= 0) {
      if(action == true) {
        this.PresMax += 1;
      } else {
        if (this.PresMax > 1) {
          this.PresMax -= 1;
        } else {
          this._snackBar.open("Tallet Kan ikke gå lavere", "Ok");
        }
      }
    }
  };

  saveSettings() {
    const body = {
      settings: [
        { name: SETTING.MIN_TEMP, value: this.TempMin },
        { name: SETTING.MAX_TEMP, value: this.TempMax },
        { name: SETTING.MIN_HUMI, value: this.HumiMin },
        { name: SETTING.MAX_HUMI, value: this.HumiMax },
        { name: SETTING.MIN_PRES, value: this.PresMin },
        { name: SETTING.MAX_PRES, value: this.PresMax }
      ] 
    };

    this.AlarmService.saveAlarmSettings(body);
  }
}
