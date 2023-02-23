import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Trending } from 'src/app/interfaces/trending';
import { TrendingItem } from 'src/app/interfaces/trending-item';
import { Gainers, Losers } from 'src/app/interfaces/market-data';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | '';
  chart?: ApexChart | '';
  xaxis?: ApexXAxis | '';
  yaxis?: ApexYAxis | '';
  title?: ApexTitleSubtitle | '';
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  trending: Trending[] = [];
  trendingCoins: TrendingItem[] = [];
  candlestickData: any;
  cryptoData: any;
  gainers: Gainers[] = [];
  isLoading = true;
  losers: Losers[] = [];

  constructor(private cryptoService: RequestService, public router: Router) {
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: [
            {
              x: new Date(1675915200000),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(1675929600000),
              y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
              x: new Date(1675944000000),
              y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
            {
              x: new Date(1675972800000),
              y: [6635.65, 6651, 6629.67, 6638.24]
            },
          ]
        }
      ],
      chart: {
        type: "candlestick",
        height: 350
      },
      title: {
        text: "CandleStick Chart",
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
  }

  ngOnInit(): void {
    // this.candlestickChart();
    this.trendingCrypto();
    this.getCoinsData();
    this.sortGainers();
    this.sortLosers();
  }

  public openCrypto(id: string) {
    //tu ustawiamy symbol, który pobieramy z template HTML
    this.router.navigate([`crypto/${id}`]);
  }

  candlestickChart(): void {
    this.cryptoService.getCandlesticksInfo().subscribe({
      next: (response) => {
        this.candlestickData = response;
        console.log('candlestick chart data: ', this.candlestickData);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => (this.isLoading = false),
    });
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

  sortGainers(): void {
    this.cryptoService.getMarketData().subscribe({
      next: (data) => {
        this.gainers = data;
        console.log('gainers function:', this.gainers);
        const sortedGainer = this.gainers.sort((a, b) =>
          a.price_change_percentage_24h > b.price_change_percentage_24h ? -1 : 1
        );
        console.log('sorted gainer:', sortedGainer);
      },
      error: (error: any) =>
        console.log('error while fetching crypto market data: ', error),
      complete: () => (this.isLoading = false),
    });
  }
  sortLosers(): void {
    this.cryptoService.getMarketData().subscribe({
      next: (data) => {
        this.losers = data;
        console.log('gainers function:', this.losers);
        const sortedGainer = this.losers.sort((a, b) =>
          a.price_change_percentage_24h < b.price_change_percentage_24h ? -1 : 1
        );
        console.log('sorted gainer:', sortedGainer);
      },
      error: (error: any) =>
        console.log('error while fetching crypto market data: ', error),
      complete: () => (this.isLoading = false),
    });
  }

  trendingCrypto(): void {
    this.cryptoService.getTrending().subscribe({
      next: (response) => {
        this.trending = response;
        console.log('trending: ', this.trending);
        this.trendingCoins = this.trending.map((coins) => coins.item);
        console.log('trending coins list: ', this.trendingCoins);
      },
      error: (error: any) =>
        console.log('error while fetching trending data: ', error),
      complete: () => (this.isLoading = false),
    });
  }
}
