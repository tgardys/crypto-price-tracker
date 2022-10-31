import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CryptoComponent } from './crypto.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CryptoComponent],
})
export class CryptoModule {}
