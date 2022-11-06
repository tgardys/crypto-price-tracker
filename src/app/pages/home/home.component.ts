import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isLoading = false;

  constructor(private cryptoService: RequestService, public router: Router) {}

  ngOnInit(): void {
    this.onGetCrypto();
    // this.onGetMeta();
  }

  public openCrypto(slug: string) {
    this.router.navigate([`crypto/${slug}`]);
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
