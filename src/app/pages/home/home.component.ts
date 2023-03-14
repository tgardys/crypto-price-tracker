import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  cryptoData: any;
  gainers: Gainers[] = [];
  isLoading = true;
  losers: Losers[] = [];

  constructor(private cryptoService: RequestService, public router: Router) { }

  ngOnInit(): void {
    this.trendingCrypto();
    this.sortGainers();
    this.sortLosers();
  }

  public openCrypto(id: string) {
    //tu ustawiamy symbol, który pobieramy z template HTML
    this.router.navigate([`crypto/${id}`]);
  }

  sortGainers(): void {
    this.cryptoService.getMarketData().subscribe({
      next: (data) => {
        this.gainers = data;
        this.gainers.sort((a, b) =>
          a.price_change_percentage_24h > b.price_change_percentage_24h ? -1 : 1
        );
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

        this.losers.sort((a, b) =>
          a.price_change_percentage_24h < b.price_change_percentage_24h ? -1 : 1
        );
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
        this.trendingCoins = this.trending.map((coins) => coins.item);
      },
      error: (error: any) =>
        console.log('error while fetching trending data: ', error),
      complete: () => (this.isLoading = false),
    });
  }
}
