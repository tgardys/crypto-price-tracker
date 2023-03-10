import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  isLoading = true;
  categoriesData: any;
  itemsPerPage: number = 25;
  currentPage: number = 1;
  constructor(private cryptoService: RequestService, public router: Router) {}

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.cryptoService.getCategoriesData().subscribe({
      next: (data) => {
        this.categoriesData = data;
        console.log('categories data: ', this.categoriesData);
      },
      error: (error: any) =>
        console.log('error while fetching crypto categories data: ', error),
      complete: () => (this.isLoading = false),
    });
  }
}
