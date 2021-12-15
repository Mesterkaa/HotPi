import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { SequenceError, Subscription } from 'rxjs';
import { SETTING } from 'src/app/core/const/setting.const';
import { IDevice } from 'src/app/core/interfaces/IDevice';
import { IMeasurement } from 'src/app/core/interfaces/IMeasurement';
import { DataService } from 'src/app/core/services/data/data.service';
import { DeviceService } from 'src/app/core/services/device/device.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

//let device = ["61a8b53bc7e502f0206982b7", "61a748ca8ee7e608bb34f361", "61ab5c6cae1f04f3b15ce969"];

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  template: `
        <chart style="width: 100%; height: 100%; display: block;" [options]="options"></chart>
    `
})
export class GraphComponent implements OnInit, OnDestroy {
  updateFlag: boolean = false;
  title = 'angular-gui';
  Highcharts = Highcharts;
  seriesOptions:any={};
  chartConstructor = "stockChart";
  chart: any;


  public selectedDevices: string[] = [];
  public devices: IDevice[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private dataService: DataService, private deviceService: DeviceService, private settingService: SettingsService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.deviceService.devices.subscribe(devices => {
      this.devices = devices;
    }))
    this.subscriptions.push(this.settingService.settings.subscribe(settings => {
      this.selectedDevices = settings[SETTING.DEVICES];
    }))
    this.subscriptions.push(this.dataService.data.subscribe((new_data) => {
      console.log(new_data);

      let data: {[key: string]: any[]} = {};
      const series: {name: string, id: string, data: any[]}[] = [];
      this.selectedDevices.forEach(element => {
        data[element] = [];
      });

      new_data.forEach((e: IMeasurement) => {
        data[e.device_id].push([(new Date(e.time)).getTime(), e.measurement])
      })

      Object.keys(data).forEach(e => {
        let name = this.devices.find((device) => {
          return device._id = e;
        })?.name;
        if (name) series.push({ name: name, id: e, data: data[e] })
      });
      console.log(series)

      this.chartOptions = {
        chart: {
          type: "line",
          zoomType: "xy",
          panning: true,
          panKey: "shift",
        },
        // Disable time selector
        navigator: {
          enabled: false
        },
        // Disable range selector
        rangeSelector: {
          enabled:false
        },
        // Disable bottom scrollbar
        scrollbar: {
          enabled:false
        },
        series: series
      };
      this.updateFlag = true;
    }));

  }
  // Chart styling
  chartOptions: any = {
    // Top chart title
    title: {
      text: "Temperatur",
      style: {
        fontSize:'20px',
        fontWeight: 'bold'
    }
    },
    // xAxis column style
    xAxis: {
      labels: {
        style: {
            fontSize:'20px',
            fontWeight: 'bold'
        }
    },
    // xAxis title style
      title: {
        text: "Tid",
          style: {
            fontSize:'20px',
            fontWeight: 'bold'
        }
      }
    },
    // xAxis column styling
    yAxis: {
      labels: {
        style: {
            fontSize:'20px',
            fontWeight: 'bold'
        }
    },
    // xAxis title style
      title: {
        text: "Temperatur",
          style: {
            fontSize:'20px',
            fontWeight: 'bold'
        }
      }
    },
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
}
  };


