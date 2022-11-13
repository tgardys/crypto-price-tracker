import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Trending } from 'src/app/interfaces/trending';
import { TrendingItem } from 'src/app/interfaces/trending-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  trending: Trending[] = [];
  trendingCoins: TrendingItem[] = [];

  constructor(private cryptoService: RequestService, public router: Router) {}

  ngOnInit(): void {
    this.trendingCrypto();
  }

  public openCrypto(id: string) {
    //tu ustawiamy slug, który pobieramy z template HTML
    this.router.navigate([`crypto/${id}`]);
  }

  trendingCrypto(): void {
    this.cryptoService.getTrending().subscribe({
      next: (response) => {
        this.trending = response;
        console.log('trending list: ', this.trending);
        this.trendingCoins = this.trending.map((coins) => coins.item);
        console.log('trending coins list: ', this.trendingCoins);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => (this.isLoading = false),
    });
  }
}
