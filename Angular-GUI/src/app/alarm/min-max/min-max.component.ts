import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-min-max',
  templateUrl: './min-max.component.html',
  styleUrls: ['./min-max.component.scss']
})
export class MinMaxComponent implements OnInit {

  public TempMin: number = 5;
  public TempMax: number = 5;
  public HumMin: number = 5;
  public HumMax: number = 5;
  public PresMin: number = 5;
  public PresMax: number = 5;
  settings: any = []

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.settingsService.GetSettings().subscribe((res) => {
      this.settings = res;

      console.log(this.settings);
    });
  }

}
