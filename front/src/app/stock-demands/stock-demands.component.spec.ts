import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDemandsComponent } from './stock-demands.component';

describe('StockDemandsComponent', () => {
  let component: StockDemandsComponent;
  let fixture: ComponentFixture<StockDemandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockDemandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
