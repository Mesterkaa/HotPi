import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { GrafService } from '../services/graf/graf.service'

let device = ["61a8b53bc7e502f0206982b7", "61a748ca8ee7e608bb34f361", "61ab5c6cae1f04f3b15ce969"];

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss'],
  template: `
        <chart style="width: 100%; height: 100%; display: block;" [options]="options"></chart>
    `
})
export class GraphPageComponent implements OnInit {
  updateFlag: boolean = false;
  title = 'angular-gui';
  Highcharts = Highcharts;
  seriesOptions:any={};
  chartConstructor = "stockChart";
  chart: any;
  

  constructor(private graph: GrafService) { }

  ngOnInit(): void {
    this.graph.get_data().subscribe(result => {


      let data: {[key: string]: any[]} = {};
      const o: string[] = [];

      device.forEach(element => {
        data[element] = [];
        console.log(element);
      });
      result.forEach((e: any) => {
        data[e.device_id].push([(new Date(e.time)).getTime(), e.measurement])
      })

      Object.keys(data).forEach(e => {
        //o.push({ name: e, id: e, data: data[e] })
      });


      this.seriesOptions = [
        {
          name: "1",
          data: data["61a8b53bc7e502f0206982b7"],
          id: "dataseries1",
          //color: '#d32f2f',
        },
        {
          name: "2",
          data: data["61a748ca8ee7e608bb34f361"],
          id: "dataseries2",
          //color: '#90caf9',
        },
        {
          name: "3",
          data: data["61ab5c6cae1f04f3b15ce969"],
          id: "dataseries3",
          //color: '#90caf9',
        }
      ];
      // chartOptions 
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
      rangeSelector:{
        enabled:false
    },
    // Disable bottom scrollbar
    scrollbar:{
      enabled:false
  },
        series: this.seriesOptions
      };
    })
    this.updateFlag = true;
  }
  // Chart styling
  chartOptions:any={
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
  };


