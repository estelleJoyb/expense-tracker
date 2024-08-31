import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsformComponent } from './transactionsform.component';

describe('TransactionsformComponent', () => {
  let component: TransactionsformComponent;
  let fixture: ComponentFixture<TransactionsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
