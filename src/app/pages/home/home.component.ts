import { Component, OnInit } from '@angular/core';
import { Crypto } from 'src/app/interfaces/crypto.interface';
import { CryptoData } from 'src/app/interfaces/cryptoDaTA.interface';
import { Quote } from 'src/app/interfaces/quote.interface';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cryptos: Crypto[] = [];
  cryptoData: CryptoData[] = [];

  constructor(private cryptoService: RequestService) {}

  ngOnInit(): void {
    this.onGetCrypto();
  }

  AfterViewInit(): void {}

  onGetCrypto(): void {
    this.cryptoService.getCrypto().subscribe({
      next: (response) => {
        this.cryptos = response;
        console.log('crypto list: ', this.cryptos);

        this.cryptoData = this.cryptos.map((quote) => quote.quote.USD);
        console.log('crypto data: ', this.cryptoData);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => console.log('Done getting cryptos'),
    });
  }
}
