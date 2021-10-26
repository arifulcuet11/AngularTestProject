import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogAddMovieComponent } from './dailog-add-movie.component';

describe('DailogAddMovieComponent', () => {
  let component: DailogAddMovieComponent;
  let fixture: ComponentFixture<DailogAddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogAddMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogAddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
