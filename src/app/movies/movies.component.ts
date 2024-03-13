import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  displayedColumns: string[] = ['id', 'title', 'genre', 'author', 'actions'];
  dataSource = new MatTableDataSource<Movie>();
  paginatorIntl = new MatPaginatorIntl();

  pageNumber = 0;
  pageSize = 20;
  sortField = 'title';
  desc = false;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(this.paginatorIntl, this.paginatorDetectorRef);

  constructor(private apiService: ApiService, private paginatorDetectorRef: ChangeDetectorRef, public dialog: MatDialog) {
    this.fetchTable();
  }

  fetchTable() {
    this.apiService.getMovies(this.pageNumber, this.pageSize, this.sortField, this.desc).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteMovie(id: number) {
    this.apiService.deleteMovie(id).subscribe(() => {
      console.log('Movie ' + id + ' deleted.');
      this.fetchTable();
    });
  }

  openDialog(data?: Movie): void {
    let movie = undefined;
    if (data) {
      movie = data;
    } else {
      movie = {
        id: 0,
        title: '',
        genre: '',
        author: ''
      };
    }

    const dialogRef = this.dialog.open(MovieDialog, {
      data: { id: movie.id, title: movie.title, genre: movie.genre, author: movie.author },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.apiService.saveMovie(result).subscribe(() => this.fetchTable());
      }
    });
  }
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  author: string;
}

@Component({
  selector: 'app-movies-dialog',
  templateUrl: 'movies.dialog.html',
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
  ],
})
export class MovieDialog {

  constructor(public dialogRef: MatDialogRef<MovieDialog>, @Inject(MAT_DIALOG_DATA) public data: Movie) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
