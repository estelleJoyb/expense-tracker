import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TransactionsformComponent } from './transactionsform/transactionsform.component';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MenubarModule, TransactionsformComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  items : MenuItem[] = [{label: 'Déconnexion', routerLink: '/logout', icon: 'pi pi-fw pi-sign-out'}];
  display: boolean = false;
  transactions : Transaction[] = [];
  /* Object { id: 2, description: "croquettes", amount: 2, category: "Alimentation", date: "2024-08-31T14:01:28.905Z", updatedAt: "2024-08-31T14:01:28.905Z", createdAt: "2024-08-31T14:01:28.905Z" } */
  constructor(private transactionService : TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransaction().subscribe((res) => {
      console.log("transaction GET", res);
    })
  }

  
}
