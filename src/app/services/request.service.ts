import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Crypto } from '../interfaces/crypto.interface';
import { CryptoData } from '../interfaces/CryptoData.interface';
import { CryptoMeta } from 'src/app/interfaces/cryptoMeta.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseURL: string = environment.baseURL;
  api_key: string = '?CMC_PRO_API_KEY=fee8e722-9b47-4b0a-8ec4-af996de95200';
  /// 1. init symbols array of strings
  symbols: string[] = ['BTC', 'ETH', 'LTC'];

  constructor(private http: HttpClient) {}

  getCrypto(): Observable<Crypto[]> {
    const myParams = new HttpParams().set('limit', '20');
    return this.http
      .get<Crypto[]>(
        `${this.baseURL}/v1/cryptocurrency/listings/latest${this.api_key}`,
        { params: myParams }
      )
      .pipe(map((result) => result['data']));
  }

  getCryptoMeta(): Observable<CryptoMeta[]> {
    /// 2. pass symbols as a parameter, need to use toString() otherwise we get types error
    const myParams = new HttpParams().set('symbol', this.symbols.toString());

    return this.http
      .get<Crypto[]>(`${this.baseURL}/v2/cryptocurrency/info${this.api_key}`, {
        params: myParams,
      })
      .pipe(map((result) => result['data']));
  }
}
