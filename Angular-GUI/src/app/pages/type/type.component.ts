import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { SETTING } from 'src/app/core/const/setting.const';
import { M_TYPE } from 'src/app/core/const/m_type.const';


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})


export class TypeComponent implements OnInit, OnDestroy {
  check = true;
  public selectedType: string = '';
  public readonly types: M_TYPE[] = [M_TYPE.TEMP, M_TYPE.HUMI, M_TYPE.PRES];
  private subscription: Subscription = Subscription.EMPTY
  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
    this.subscription = this.settingsService.settings.subscribe(settings => {
      this.selectedType = settings[SETTING.TYPE];
    })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  selectionChange(event: MatRadioChange) {
    this.settingsService.save([{name: SETTING.TYPE, value: event.value}]);
  }

  translate(type: M_TYPE): string {
    switch (type) {
      case M_TYPE.TEMP:
        return "Temperatur";
      case M_TYPE.HUMI:
        return "Luft fugtighed";
      case M_TYPE.PRES:
        return "Lufttryk"
    }
  }

}
