import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'continent',
    loadChildren: () =>
      import('./pages/home/continent/continent.module').then(
        (mod) => mod.ContinentModule
      ),
  },
  {
    path: 'continent/country',
    loadChildren: () =>
      import('./pages/home/continent/country/country.module').then(
        (mod) => mod.CountryModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
