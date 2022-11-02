import { Component, OnInit } from '@angular/core';
import { Crypto } from 'src/app/interfaces/crypto.interface';
import { CryptoData } from 'src/app/interfaces/CryptoData.interface';
import { CryptoMeta } from 'src/app/interfaces/cryptoMeta.interface';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cryptos: Crypto[] = [];
  cryptoData: CryptoData[] = [];
  cryptoMeta: CryptoMeta[] = [];

  isLoading = true;

  constructor(private cryptoService: RequestService) {}

  ngOnInit(): void {
    this.onGetCrypto();
    this.onGetMeta();
  }

  onGetCrypto(): void {
    this.cryptoService.getCrypto().subscribe({
      next: (response) => {
        this.cryptos = response;
        console.log('crypto list: ', this.cryptos);

        this.cryptoData = this.cryptos.map((quote) => quote.quote.USD);
        console.log('crypto data: ', this.cryptoData);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => (this.isLoading = false),
    });
  }

  onGetMeta() {
    this.cryptoService.getCryptoMeta().subscribe({
      next: (response) => {
        this.cryptoMeta = response;
        console.log('meta data: ', this.cryptoMeta);
      },
      error: (error: any) => console.log('error: ', error),
      complete: () => console.log('done'),
    });
  }
}
