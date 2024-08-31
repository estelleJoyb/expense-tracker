import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { TransactionService } from '../../services/transaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import {InputNumberModule} from 'primeng/inputnumber';
@Component({
  selector: 'app-transactionsform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, FloatLabelModule, FormsModule, InputNumberModule],
  templateUrl: './transactionsform.component.html',
  styleUrl: './transactionsform.component.scss'
})
export class TransactionsformComponent {
  description : string = "";
  amount: number = 0;
  category: string = "";
  constructor(private transactionService: TransactionService){}

  public addTransaction(): void {
    this.transactionService.addTransaction(this.description, this.amount, this.category).subscribe((res) => {
      console.log("add transaction ", res);
      //this.authService.setToken(res);
      //this.router.navigate(['/transactions']);
    });
  }
}
