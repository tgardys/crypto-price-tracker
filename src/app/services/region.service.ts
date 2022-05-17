import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from '../interfaces/region.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegionService {
  constructor(private http: HttpClient) {}
  getRegion(): Observable<Region[]> {
    return this.http.get<Region[]>(
      'https://restcountries.com/v3.1/subregion/europe'
    );
  }
}
