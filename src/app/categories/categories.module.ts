import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriesComponent } from './categories.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  exports: [CategoriesComponent],
  declarations: [CategoriesComponent],
})
export class CategoriesModule {}
