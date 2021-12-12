import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { SETTING } from 'src/app/helper/setting.const';


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})


export class TypeComponent implements OnInit {
  check = true;
  public selectedType: string = '';
  public readonly types: string[] = ['temperature', 'humidity', 'air_pressure'];
  private subscription: Subscription = Subscription.EMPTY
  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
    this.subscription = this.settingsService.settings.subscribe(settings => {
      this.selectedType = settings[SETTING.TYPE];
    })
  }
  selectionChange(event: MatRadioChange) {
    this.settingsService.save([{name: SETTING.TYPE, value: event.value}]);
  }

}
