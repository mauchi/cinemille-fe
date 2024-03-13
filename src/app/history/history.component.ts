import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatSortModule } from '@angular/material/sort';
import { MovieTheater } from '../movie-theaters/movie-theaters.component';
import { Movie } from '../movies/movies.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, DatePipe, MatSortModule, MatDividerModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'movie', 'movieTheater', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<Screening>();

  pageNumber = 0;
  pageSize = 20;
  sortField = 'startDate'
  desc = false;

  @ViewChild(MatPaginator) paginator = null;

  constructor(private apiService: ApiService) {
  }

  ngAfterViewInit() {
    this.apiService.getScreenings(this.pageNumber, this.pageSize, this.sortField, this.desc).subscribe(data => this.dataSource.data = data);
  }
}

export interface Screening {
  id: number;
  movie: Movie;
  movieTheater: MovieTheater;
  startDate: Date;
  endDate: Date;
}