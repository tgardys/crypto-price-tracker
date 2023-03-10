import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabComponent } from './tab.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [TabComponent],
  declarations: [TabComponent],
})
export class TabModule { }
