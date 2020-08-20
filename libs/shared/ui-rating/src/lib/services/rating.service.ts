import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class RatingService {
  private url: string | null = null;

  constructor(private http: HttpClient) {}

  setUrl(url: string | null): void {
    this.url = url;
  }

  getRating(): Observable<number | never> {
    if (!this.url) {
      return EMPTY;
    }

    return this.http.get<number>(this.url);
  }

  saveRating(rating: number): Observable<void | never> {
    if (!this.url) {
      return EMPTY;
    }

    return this.http.post<void>(this.url, { rating });
  }
}
