import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Crypto } from '../interfaces/crypto.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseURL: string = environment.baseURL;
  api_key: string = '?CMC_PRO_API_KEY=fee8e722-9b47-4b0a-8ec4-af996de95200';
  data: Crypto[] = [];

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
}
