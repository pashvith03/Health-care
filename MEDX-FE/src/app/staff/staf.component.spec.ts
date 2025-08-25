import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StafComponent } from './staf.component';

describe('StafComponent', () => {
  let component: StafComponent;
  let fixture: ComponentFixture<StafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StafComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
