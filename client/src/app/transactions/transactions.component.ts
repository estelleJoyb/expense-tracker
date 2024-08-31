import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TransactionsformComponent } from './transactionsform/transactionsform.component';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MenubarModule, TransactionsformComponent, TableModule, ChartModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  items : MenuItem[] = [{label: 'Déconnexion', routerLink: '/logout', icon: 'pi pi-fw pi-sign-out'}];
  display: boolean = false;
  basicOptions : any;
  transactions : Transaction[] = [];
 
  constructor(private transactionService : TransactionService) {}

  ngOnInit() {
    this.getTransactions();
    this.transactionService.getTransactions().subscribe((res) => {
      this.transactions = res;
    })

  }

  public getTransactions(){
    this.transactionService.getTransaction().subscribe((res : Transaction[]) => {
      this.transactionService.setTransactions(res);
    });
  }

  public delete(id : number){
    this.transactionService.deleteTransaction(id).subscribe((res) => {
      console.log("res delete transaction", res);
      this.getTransactions();
    })
  }  
}
