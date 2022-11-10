import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Trending } from '../interfaces/trending';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseURL: string = environment.baseURL;
  /// 1. init symbols array of strings
  symbols: string[] = ['BTC', 'ETH', 'LTC'];

  constructor(private http: HttpClient) {}

  getTrending(): Observable<Trending[]> {
    return this.http
      .get<Trending[]>(`${this.baseURL}/search/trending`)
      .pipe(map((res) => res['coins']));
  }
}
