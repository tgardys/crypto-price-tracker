import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CryptoComponent } from './crypto/crypto.component';
import { NgApexchartsModule } from 'ng-apexcharts';

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
  imports: [CommonModule, RouterModule.forChild(routes), NgApexchartsModule],
  declarations: [HomeComponent, CryptoComponent],
})
export class HomeModule { }
