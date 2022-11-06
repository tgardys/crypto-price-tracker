import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoMeta } from 'src/app/interfaces/cryptoMeta.interface';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  cryptoMeta: CryptoMeta[] = [];

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
