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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoriesModule } from 'src/app/categories/categories.module';
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
    Ng2SearchPipeModule,
    CategoriesModule,
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
export class HomeModule { }
