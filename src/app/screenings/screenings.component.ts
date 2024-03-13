import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../api.service';
import { Screening } from '../history/history.component';
import { MovieTheater } from '../movie-theaters/movie-theaters.component';
import { Movie } from '../movies/movies.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-screenings',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './screenings.component.html',
  styleUrl: './screenings.component.css'
})
export class ScreeningsComponent {

  displayedColumns: string[] = ['id', 'movie', 'movieTheater', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource<Screening>();
  paginatorIntl = new MatPaginatorIntl();

  pageNumber = 0;
  pageSize = 20;
  sortField = 'startDate';
  desc = false;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(this.paginatorIntl, this.paginatorDetectorRef);

  constructor(private apiService: ApiService, private paginatorDetectorRef: ChangeDetectorRef, public dialog: MatDialog) {
    this.fetchTable();
  }

  fetchTable() {
    this.apiService.getScreenings(this.pageNumber, this.pageSize, this.sortField, this.desc).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteScreening(id: number) {
    this.apiService.deleteScreening(id).subscribe(() => {
      console.log('Screening ' + id + ' deleted.');
      this.fetchTable();
    });
  }

  openDialog(data?: Screening): void {
    let screening = undefined;
    if (data) {
      screening = data;
    } else {
      screening = {
        id: 0,
        movie: null,
        movieTheater: null,
        startDate: null,
        endDate: null
      };
    }

    const dialogRef = this.dialog.open(ScreeningDialog, {
      data: { id: screening.id, movie: screening.movie, movieTheater: screening.movieTheater, startDate: screening.startDate, endDate: screening.endDate },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.apiService.saveScreening(result).subscribe(() => this.fetchTable());
      }
    });
  }
}

@Component({
  selector: 'app-screenings-dialog',
  templateUrl: 'screenings.dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatAutocompleteModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()]
})
export class ScreeningDialog {

  movies: Movie[] = [];
  movieTheaters: MovieTheater[] = [];

  constructor(public dialogRef: MatDialogRef<ScreeningDialog>, @Inject(MAT_DIALOG_DATA) public data: Screening, private apiService: ApiService) {
    this.apiService.getMovies(0, 20, 'title', false).subscribe(movies => this.movies = movies);
    this.apiService.getMovieTheaters(0, 20, 'name', false).subscribe(movieTheaters => this.movieTheaters = movieTheaters);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  movieTheaterName(value: MovieTheater) {
    return value ? value.name : '';
  }

  movieTitle(value?: Movie) {
    return value ? value.title : '';
  }
}
