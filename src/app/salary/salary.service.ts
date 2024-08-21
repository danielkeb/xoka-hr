import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";

export interface Users {
  salaryId: string
  amount: number
  employeeId: string
}
export interface User {
  salaryId: string
  amount: number
  employeeId: string
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3333/salary'; // Fixed spacing for readability

  constructor(private router: Router, private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/get`).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  getUsersById(salaryId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get/${salaryId}`);
  }

 


  updateUser(salaryId: string, user: User): Observable<User> { // Remove generic type
    return this.http.patch<User>(`${this.apiUrl}/update/${salaryId}`, user);
  }


  deleteSalary(salaryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${salaryId}`);
  }


  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
