import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,

  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  grid: ApexGrid;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  chartsData: any;

  isLoading = true;
  cryptoData: any;
  itemsPerPage: number = 25;
  currentPage: number = 1;

  constructor(private cryptoService: RequestService, public router: Router) {
    this.chartOptions = {
      series: [
        {
          name: "Bitcoin",
          data: [[1324508400000, 34], [1324594800000, 54], [1326236400000, 43]]
        }
      ],
      chart: {
        toolbar: {
          show: false,
        },
        height: 120,
        width: 200,
        type: "line",
        zoom: {
          enabled: false
        }

      },
      stroke: {
        curve: "stepline"
      },
      xaxis: {
        labels: { show: false },
        type: 'datetime',
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        show: false
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
      }
    };
  }

  ngOnInit(): void {
    this.candlestickChart();
    this.getCoinsData();
  }

  candlestickChart(): void {
    this.cryptoService.getCandlesticksInfo().subscribe({
      next: (response) => {
        this.chartsData = response;
        console.log('candlestick chart data: ', this.chartsData);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => (this.isLoading = false),
    });
  }

  public openCrypto(id: string) {
    //tu ustawiamy symbol, który pobieramy z template HTML
    this.router.navigate([`crypto/${id}`]);
  }
  getCoinsData(): void {
    this.cryptoService.getMarketData().subscribe({
      next: (data) => {
        this.cryptoData = data;
        console.log('crypto market data: ', this.cryptoData);
      },
      error: (error: any) =>
        console.log('error while fetching crypto market data: ', error),
      complete: () => (this.isLoading = false),
    });
  }
}
