import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  isLoading = true;
  cryptoData: any;
  itemsPerPage: number = 25;
  currentPage: number = 1;
  orderDSC: boolean = true;
  constructor(private cryptoService: RequestService, public router: Router) {}

  ngOnInit(): void {
    this.getCoinsData();
  }

  public openCrypto(id: string) {
    //tu ustawiamy symbol, który pobieramy z template HTML
    this.router.navigate([`crypto/${id}`]);
  }
  getCoinsData(): void {
    this.cryptoService.getMarketData().subscribe({
      next: (data) => {
        this.cryptoData = data;
        console.log('crypto market data: ', this.cryptoData);
      },
      error: (error: any) =>
        console.log('error while fetching crypto market data: ', error),
      complete: () => (this.isLoading = false),
    });
  }

  sortPrice() {
    if (this.orderDSC) {
      let newarr = this.cryptoData.sort(
        (a: { current_price: number }, b: { current_price: number }) =>
          b.current_price - a.current_price
      );
      this.cryptoData = newarr;
    } else {
      let newarr = this.cryptoData.sort(
        (a: { current_price: number }, b: { current_price: number }) =>
          a.current_price - b.current_price
      );
      this.cryptoData = newarr;
    }
    this.orderDSC = !this.orderDSC;
  }
  sortMarketCap() {
    if (this.orderDSC) {
      let newarr = this.cryptoData.sort(
        (a: { market_cap: number }, b: { market_cap: number }) =>
          b.market_cap - a.market_cap
      );
      this.cryptoData = newarr;
    } else {
      let newarr = this.cryptoData.sort(
        (a: { market_cap: number }, b: { market_cap: number }) =>
          a.market_cap - b.market_cap
      );
      this.cryptoData = newarr;
    }
    this.orderDSC = !this.orderDSC;
  }

  sort24hChange() {
    if (this.orderDSC) {
      let newarr = this.cryptoData.sort(
        (
          a: { price_change_percentage_24h: number },
          b: { price_change_percentage_24h: number }
        ) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
      this.cryptoData = newarr;
    } else {
      let newarr = this.cryptoData.sort(
        (
          a: { price_change_percentage_24h: number },
          b: { price_change_percentage_24h: number }
        ) => a.price_change_percentage_24h - b.price_change_percentage_24h
      );
      this.cryptoData = newarr;
    }
    this.orderDSC = !this.orderDSC;
  }

  sortName() {
    if (this.orderDSC) {
      let newarr = this.cryptoData.sort(function (a: any, b: any) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      let newarr = this.cryptoData.sort(function (a: any, b: any) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    }
    this.orderDSC = !this.orderDSC;
  }
}
