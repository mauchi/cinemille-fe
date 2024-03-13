import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-movie-theaters',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatSortModule, MatIconModule, MatDividerModule],
  templateUrl: './movie-theaters.component.html',
  styleUrl: './movie-theaters.component.css'
})
export class MovieTheatersComponent {
  displayedColumns: string[] = ['id', 'name', 'seats', 'imax'];
  dataSource = new MatTableDataSource<MovieTheater>();

  pageNumber = 0;
  pageSize = 20;
  sortField = 'id'
  desc = false;

  constructor(private apiService: ApiService) {
    this.apiService.getMovieTheaters(this.pageNumber, this.pageSize, this.sortField, this.desc).subscribe(data => this.dataSource.data = data);
  }
}

export interface MovieTheater {
  id: number;
  name: string;
  seats: number;
  imax: boolean;
}