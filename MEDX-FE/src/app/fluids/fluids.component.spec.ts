import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidsComponent } from './fluids.component';

describe('FluidsComponent', () => {
  let component: FluidsComponent;
  let fixture: ComponentFixture<FluidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
