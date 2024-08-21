import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";

export interface Users {
  companyId: string; // Changed to lowercase 'string'
  name: string;
  industry: string;
  contact: string;
  logo: string;
  address: string;
  
}
export interface User {
  companyId: string; // Changed to lowercase 'string'
  name: string;
  industry: string;
  contact: string;
  logo: string;
  address: string;
  
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3333/company'; // Fixed spacing for readability

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/get`).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  getUsersById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get/${userId}`);
  }

 


  updateUser(userId: string, formData: FormData): Observable<User> { // Remove generic type
    return this.http.patch<User>(`${this.apiUrl}/update/${userId}`, formData);
  }


  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${userId}`);
  }

  profileUpdate(userId: string, user: Partial<Users>): Observable<Users> {
    return this.http.patch<Users>(`${this.apiUrl}/profile/${userId}`, user);
  }

  registerUser(user: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, user).pipe(
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
