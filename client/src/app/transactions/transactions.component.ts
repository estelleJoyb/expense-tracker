import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
  transactions = [
    { id: 1, date: '2024-08-30', amount: 100, description: 'Transaction 1' },
    { id: 2, date: '2024-08-31', amount: 200, description: 'Transaction 2' },
  ];

  ngOnInit() {
  }
}
