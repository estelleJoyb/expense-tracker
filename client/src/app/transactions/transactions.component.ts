import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  items : MenuItem[] = [{label: 'Ajouter une transaction', icon : 'pi pi-fw pi-plus'}, {label: 'Déconnexion', routerLink: '/logout', icon: 'pi pi-fw pi-sign-out'}];

  constructor() {}
  transactions = [
    { id: 1, date: '2024-08-30', amount: 100, description: 'Transaction 1' },
    { id: 2, date: '2024-08-31', amount: 200, description: 'Transaction 2' },
  ];

  ngOnInit() {
  }
}
