import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country.component';

const routes: Routes = [
  {
    path: '',
    component: CountryComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CountryComponent],
})
export class CountryModule {}
