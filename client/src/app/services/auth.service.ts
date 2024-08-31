import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token : string = "";
  private apiUrl = 'http://localhost:5000/api/auth/'; 

  constructor(private http: HttpClient) { }

  // private getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwtDecode(token);
  //   } catch(Error) {
  //     return null;
  //   }
  // }

//   public getUserId(): number{
//   var decodedToken = this.getDecodedAccessToken(this.token);
//   var userId = decodedToken.user.id;
//  return userId;
//   }

  public setToken(t : any){
    this.isAuthenticated = true;
    this.token = t.token;
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
