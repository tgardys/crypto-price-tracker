import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Trending } from 'src/app/interfaces/trending';
import { TrendingItem } from 'src/app/interfaces/trending-item';
import { Gainers, Losers } from 'src/app/interfaces/market-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trending: Trending[] = [];
  trendingCoins: TrendingItem[] = [];
  candlestickData: any;

  categoriesData: any;
  gainers: Gainers[] = [];
  isLoading = true;
  losers: Losers[] = [];

  constructor(private cryptoService: RequestService, public router: Router) {}

  ngOnInit(): void {
    // this.candlestickChart();
    this.trendingCrypto();

    this.sortGainers();
    this.sortLosers();
    this.getCategoriesData();
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

  getCategoriesData(): void {
    this.cryptoService.getCategoriesData().subscribe({
      next: (data) => {
        this.categoriesData = data;
        console.log('categories data: ', this.categoriesData);
      },
      error: (error: any) =>
        console.log('error while fetching crypto categories data: ', error),
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
