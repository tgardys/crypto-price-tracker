import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  cryptos: Crypto[] = [];

  slug: string = '';

  constructor(
    private cryptoService: RequestService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    //pobieramy slug z parametru routingu, który potem przekażemy do service, żeby wysłać request o metadata dla danego crypto
    this.activatedRoute.params.subscribe((params) => {
      this.slug = params['slug'] || '';
      console.log('slug is: ', this.slug);
    });
  }
}
