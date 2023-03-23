import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  symbol: string = ''

  constructor() { }

  addToFavourites(symbol: string) {
    localStorage.setItem('symbol', symbol)
  }
}
