import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/api/transactions'; 
  private transactions : BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  constructor(private http: HttpClient, private authService : AuthService) { }

  public setTransactions(transactions : Transaction[]): void{
    this.transactions.next(transactions);
  }

  public getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }
  
  public addTransaction(description: string, amount: number, category: string): Observable<any> {
    const body = { description: description, amount: amount, category: category};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.authService.getToken()
    });

    return this.http.post(this.apiUrl, body, { headers, withCredentials: true }) 
      .pipe(
        catchError(error => {
          console.error('add Transaction error', error);
          return throwError(() => new Error(error));
        })
      );
  }

  public getTransaction(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.authService.getToken()
    });

    return this.http.get(this.apiUrl, { headers, withCredentials: true }) 
      .pipe(
        catchError(error => {
          console.error('get Transaction error', error);
          return throwError(() => new Error(error));
        })
      );
  }

  public deleteTransaction(id : number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.authService.getToken()
    });

    return this.http.delete(this.apiUrl+'/'+id, { headers, withCredentials: true }) 
      .pipe(
        catchError(error => {
          console.error('delete Transaction error', error);
          return throwError(() => new Error(error));
        })
      );
  }
}
