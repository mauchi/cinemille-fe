import { Component, Injectable } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy,
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../api.service';
import { Screening } from '../history/history.component';

@Injectable()
export class WeekRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {

  constructor(private _dateAdapter: DateAdapter<D>) {
  }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createWeekRange(date);;
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -3);
      const end = this._dateAdapter.addCalendarDays(date, 3);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-screening',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatDividerModule, MatListModule, MatButtonModule],
  templateUrl: './screening.component.html',
  styleUrl: './screening.component.css',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekRangeSelectionStrategy,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    provideNativeDateAdapter()
  ]
})
export class ScreeningComponent {

  screenings: Screening[] = [];

  constructor(private apiService: ApiService) {
  }

  setWeek(startDate: any, endDate: any) {
    if (startDate.value && endDate.value) {
      let inizio: string = startDate.value;
      let fine: string = endDate.value;

      // ISO FORMAT
      inizio = inizio.replaceAll('/', '-').split('-').map(digit => digit.length === 1 ? '0' + digit : digit).reverse().join('-');
      fine = fine.replaceAll('/', '-').split('-').map(digit => digit.length === 1 ? '0' + digit : digit).reverse().join('-');

      this.apiService.getScreeningsWeekly(inizio, fine).subscribe(screenings => this.screenings = screenings);
    }
  }

}