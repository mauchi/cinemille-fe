import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTheatersComponent } from './movie-theaters.component';

describe('MovieTheatersComponent', () => {
  let component: MovieTheatersComponent;
  let fixture: ComponentFixture<MovieTheatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTheatersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieTheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
