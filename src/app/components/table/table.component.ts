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
}
