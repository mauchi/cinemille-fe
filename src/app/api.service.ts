import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, QueryList } from '@angular/core';
import { Screening } from './history/history.component';
import { Movie } from './movies/movies.component';
import { MovieTheater } from './movie-theaters/movie-theaters.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host: string = "http://localhost:9090/cinemille/api";
  screeningsPath: string = "/screenings";
  screeningPath: string = "/screening";
  moviesPath: string = "/movies";
  moviePath: string = "/movie";
  moviesTheaterPath: string = "/movie-theaters";
  screeningsWeeklyPath = "/screenings/weekly";


  headers: HttpHeaders = new HttpHeaders().append('Access-Control-Allow-Origin', this.host);

  constructor(private httpClient: HttpClient) { }

  getScreenings(pageNumber: number, pageSize: number, sortField: string, desc: boolean) {
    const url = this.host + this.screeningsPath;
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('sortField', sortField)
      .set('desc', desc);
    return this.httpClient.get<Screening[]>(url, { params: params, headers: this.headers });
  }

  saveScreening(screening: Screening) {
    const url = this.host + this.screeningPath;
    return this.httpClient.put<Screening>(url, screening, { headers: this.headers })
  }

  deleteScreening(id: number) {
    const url = this.host + this.screeningPath + '/' + id;
    return this.httpClient.delete(url, { headers: this.headers })
  }

  getMovies(pageNumber: number, pageSize: number, sortField: string, desc: boolean) {
    const url = this.host + this.moviesPath;
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('sortField', sortField)
      .set('desc', desc);
    return this.httpClient.get<Movie[]>(url, { params: params, headers: this.headers });
  }

  saveMovie(movie: Movie) {
    const url = this.host + this.moviePath;
    return this.httpClient.put<Movie>(url, movie, { headers: this.headers })
  }

  deleteMovie(id: number) {
    const url = this.host + this.moviePath + '/' + id;
    return this.httpClient.delete(url, { headers: this.headers })
  }

  getMovieTheaters(pageNumber: number, pageSize: number, sortField: string, desc: boolean) {
    const url = this.host + this.moviesTheaterPath
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('sortField', sortField)
      .set('desc', desc);
    return this.httpClient.get<MovieTheater[]>(url, { params: params, headers: this.headers });
  }

  getScreeningsWeekly(startDate: string, endDate: string) {
    const url = this.host + this.screeningsWeeklyPath;
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.httpClient.get<Screening[]>(url, { params: params, headers: this.headers });
  }

}
