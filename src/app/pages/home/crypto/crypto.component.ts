import { Component, OnInit } from '@angular/core';
import { Crypto } from 'src/app/interfaces/crypto.interface';
import { CryptoData } from 'src/app/interfaces/CryptoData.interface';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  cryptos: Crypto[] = [];
  cryptoData: CryptoData[] = [];

  isLoading = true;

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
      complete: () => (this.isLoading = false),
    });
  }
}
