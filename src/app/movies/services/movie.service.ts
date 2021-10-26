import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieRequest } from '../models/movie-request';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  routePrefix = '/api/movies';
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(this.routePrefix);
  }
  create(model: MovieRequest): Observable<any> {
    return this.http.post(this.routePrefix, model);
  }
  getById(id: number): Observable<any> {
    return this.http.get(this.routePrefix + '/' + id);
  }
  update(id: number, model: Movie): Observable<any> {
    return this.http.put(this.routePrefix + '/' + id, model);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.routePrefix + '/' + id);
  }
}
