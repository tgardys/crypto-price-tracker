import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Trending } from 'src/app/interfaces/trending';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  trendingList: Trending[] = [];

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
        this.trendingList = response;
        console.log('crypto list: ', this.trendingList);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => (this.isLoading = false),
    });
  }
}
