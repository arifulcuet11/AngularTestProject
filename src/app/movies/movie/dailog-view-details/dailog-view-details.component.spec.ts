import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogViewDetailsComponent } from './dailog-view-details.component';

describe('DailogViewDetailsComponent', () => {
  let component: DailogViewDetailsComponent;
  let fixture: ComponentFixture<DailogViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
