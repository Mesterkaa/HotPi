import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { GrafService } from '../services/graf/graf.service'
import { HttpClient } from '@angular/common/http';

let device = ["61a8b53bc7e502f0206982b7", "61a748ca8ee7e608bb34f361", "61ab5c6cae1f04f3b15ce969"];

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent implements OnInit {
  updateFlag: boolean = false;
  title = 'angular-gui';
  Highcharts = Highcharts;
  seriesOptions:any={};
  chartOptions:any={};
  chartConstructor = "stockChart";
  chart: any;

  constructor(private graph: GrafService) { }

  ngOnInit(): void {
    this.graph.get_data().subscribe(result => {
      
      console.log(result);

      let data: {[key: string]: any[]} = {};

      device.forEach(element => {
        data[element] = [];
      });
      result.forEach((e: any) => {
        data[e.device_id].push([(new Date(e.time)).getTime(), e.measurement])
      })
      console.log(data);

      this.seriesOptions = [
        {
          name: "1",
          data: data["61a8b53bc7e502f0206982b7"],
          id: "dataseries1",
          color: '#d32f2f',
        },
        {
          name: "2",
          data: data["61a748ca8ee7e608bb34f361"],
          id: "dataseries2",
          color: '#90caf9',
        },
        {
          name: "3",
          data: data["61ab5c6cae1f04f3b15ce969"],
          id: "dataseries3",
          color: '#90caf9',
        }
      ];
      this.chartOptions = {
        chart: {
          type: "line",
          zoomType: "xy",
          panning: true,
          panKey: "shift"
        },
        series: this.seriesOptions
      };
    })
    this.updateFlag = true;
  }


}
