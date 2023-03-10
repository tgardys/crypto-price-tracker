import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [TabsComponent],
  declarations: [TabsComponent],
})
export class TabsModule { }
