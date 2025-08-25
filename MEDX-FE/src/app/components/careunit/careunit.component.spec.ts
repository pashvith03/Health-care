import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareunitComponent } from './careunit.component';

describe('CareunitComponent', () => {
  let component: CareunitComponent;
  let fixture: ComponentFixture<CareunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareunitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
