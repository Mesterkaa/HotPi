import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'angular-gui';

  highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: "Temprature"
    },
    xAxis: {
      title: {
        text: 'Tokyo',
        style: {
          fontSize:'20px',
          fontWeight: 'bold'
      }
      },
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        labels: {
          style: {
              fontSize:'20px',
              fontWeight: 'bold'
          }
      }
    },
    yAxis: {
      labels: {
        style: {
            fontSize:'20px',
            fontWeight: 'bold'
        }
    },
      title: {
        text: "Temprature",
          style: {
            fontSize:'20px',
            fontWeight: 'bold'
        }
      }
    },
    series: [{
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 24.4, 19.3, 16.0, 18.4, 17.9],
      type: 'spline',
      
      
    }]
  }

}
