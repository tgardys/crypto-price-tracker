import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trending } from '../interfaces/trending';
import { MarketData } from '../interfaces/market-data';
import { CoinData } from '../interfaces/coin-data';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseURL: string = environment.baseURL;

  /// 1. tu inicjalizacja zmieną do której pobierzemy sobie potem 'id z komponentu crypto.component.ts
  id: string;

  constructor(private http: HttpClient) {}

  getCandlesticksInfo(): Observable<any[]> {
    let myParams = new HttpParams().set('vs_currency', 'usd').set('days', '14');

    return this.http.get<any[]>(`${this.baseURL}/coins/cardano/ohlc`, {
      params: myParams,
    });
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
    // let myParams = new HttpParams()
    //   .set('ids', this.id)
    //   .set('vs_currencies', 'usd')
    //   .set('include_market_cap', 'true')
    //   .set('include_24hr_vol', 'true')
    //   .set('include_24hr_change', 'true')
    //   .set('precision', '2');

    return this.http
      .get<CoinData>(
        `${this.baseURL}/coins/${this.id}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
      )
      .pipe(map((e) => e));
  }

  getTrending(): Observable<Trending[]> {
    return this.http
      .get<Trending[]>(`${this.baseURL}/search/trending`)
      .pipe(map((res) => res['coins']));
  }
}
