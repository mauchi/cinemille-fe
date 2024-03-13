import { Routes } from '@angular/router';
import { ScreeningComponent } from './screening/screening.component';
import { HistoryComponent } from './history/history.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieTheatersComponent } from './movie-theaters/movie-theaters.component';
import { ScreeningsComponent } from './screenings/screenings.component';

export const routes: Routes = [
    { path: '', component: ScreeningComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'movie-theaters', component: MovieTheatersComponent },
    { path: 'screenings', component: ScreeningsComponent }
];
