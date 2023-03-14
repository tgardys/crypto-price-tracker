import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableComponent } from './table.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgxPaginationModule, NgApexchartsModule],
  exports: [TableComponent],
  declarations: [TableComponent],
})
export class TableModule { }
