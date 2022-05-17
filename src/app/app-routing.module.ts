import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  routes: Routes = [
    {
      path: '',
      loadChildren: () =>
        import('./pages/home/home.module').then((mod) => mod.HomeModule),
    },
    {
      path: '',
      loadChildren: () =>
        import('./pages/home/home.module').then((mod) => mod.HomeModule),
    },
  ];
}
