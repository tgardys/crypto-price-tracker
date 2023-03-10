import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CryptoComponent } from './crypto/crypto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'src/app/components/table/table.module';
import { TabModule } from 'src/app/components/tab/tab.module';
import { TabsModule } from 'src/app/components/tabs/tabs.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesModule } from 'src/app/components/categories/categories.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'crypto/:id',
    component: CryptoComponent,
  },
];

@NgModule({
  imports: [
    CategoriesModule,
    CarouselModule,
    TableModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    TabModule,
    TabsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomeComponent, CryptoComponent],
})
export class HomeModule {}
