import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinData } from 'src/app/interfaces/coin-data';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  coinData: any;

  id: string = '';
  isLoading = true;

  constructor(
    private cryptoService: RequestService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    //2. pobieramy slug z parametru routingu, który potem przekażemy do service, żeby wysłać request o metadata dla danego crypto
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] || '';
      //3. przypisuje do zmiennej id w service nasze id z komponentu
      this.cryptoService.id = this.id;
      console.log('id is: ', this.id);

      this.fetchCoinData();
    });
  }

  fetchCoinData(): void {
    this.cryptoService.getCoinData().subscribe({
      next: (data) => {
        if (data) {
          this.coinData = data;
          console.log(this.coinData);
        }
      },
      error: (error) => {
        console.log("couldn't fetch coin data: ", error);
      },
      complete: () => (this.isLoading = false),
    });
  }
}
