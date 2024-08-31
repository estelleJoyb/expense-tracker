import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token : string = "";
  private apiUrl = 'http://localhost:5000/api/auth/'; // URL de votre API

  constructor(private http: HttpClient) { }

  public setToken(t : string){
    this.isAuthenticated = true;
    this.token = t;
  }

  public getToken(): string {
    return this.token;
  }

  public login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl + 'login', body, { headers, withCredentials: true }) 
      .pipe(
        catchError(error => {
          console.error('Login error', error);
          return throwError(() => new Error(error));
        })
      );
  }

  
  public register(name : string, email: string, password : string){
    var data : string = `{"name": "${name}", "email": "${email}", "password": "${password}"}`;
    console.log("register data", data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}register`,data, { headers, withCredentials: true } );
  }


  public logout(): void {
    this.isAuthenticated = false;
    this.token = "";
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
