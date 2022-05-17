import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContinentComponent } from './continent.component';

const routes: Routes = [
  {
    path: '',
    component: ContinentComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ContinentComponent],
})
export class ContinentModule {}
