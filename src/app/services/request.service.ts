import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trending } from '../interfaces/trending';
import { MarketData } from '../interfaces/market-data';
import { CoinData } from '../interfaces/coin-data';
import { CategoriesData } from '../interfaces/categories-data';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseURL: string = environment.baseURL;

  /// 1. tu inicjalizacja zmieną do której pobierzemy sobie potem 'id z komponentu crypto.component.ts
  id: string = '';

  constructor(private http: HttpClient) { }

  getCandlesticksInfo(): Observable<any[]> {
    let myParams = new HttpParams().set('vs_currency', 'usd').set('days', '7');

    return this.http.get<any[]>(`${this.baseURL}/coins/bitcoin/ohlc`, {
      params: myParams,
    });
  }
  getCategoriesData(): Observable<CategoriesData> {
    let myParams = new HttpParams().set('order', 'market_cap_desc');

    return this.http
      .get<CategoriesData>(`${this.baseURL}/coins/categories`, {
        params: myParams,
      })
      .pipe(map((res) => res));
  }

  getMarketData(): Observable<MarketData[]> {
    let myParams = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', '100')
      .set('page', '1');

    return this.http
      .get<MarketData[]>(`${this.baseURL}/coins/markets`, {
        params: myParams,
      })
      .pipe(map((res) => res));
  }

  getCoinData(): Observable<CoinData> {
    let myParams = new HttpParams()
      .set('localization', 'false')
      .set('tickers', 'true')
      .set('market_data', 'true')
      .set('community_data', 'false')
      .set('developer_data', 'false')
      .set('sparkline', 'false');
    return this.http
      .get<CoinData>(`${this.baseURL}/coins/${this.id}?`, { params: myParams })
      .pipe(map((e) => e));
  }

  getTrending(): Observable<Trending[]> {
    return this.http
      .get<Trending[]>(`${this.baseURL}/search/trending`)
      .pipe(map((res) => res['coins']));
  }
}
