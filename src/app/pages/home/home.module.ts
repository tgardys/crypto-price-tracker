import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CryptoComponent } from './crypto/crypto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'src/app/components/table/table.module';
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
    TableModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomeComponent, CryptoComponent],
})
export class HomeModule {}
