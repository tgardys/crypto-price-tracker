import { FavouritesComponent } from './favourites.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  exports: [FavouritesComponent],
  declarations: [FavouritesComponent],
})
export class FavouritesModule { }
