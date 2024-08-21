import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";

export interface Users {
  userId: string; // Changed to lowercase 'string'
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  password: string;
  gender: string;
  role: string;
  age: string;
  address: string;
  image: string;
}
export interface User {
  userId: string; // Changed to lowercase 'string'
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  gender: string;
  role: string;
  age: string;
  address: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3333/auth'; // Fixed spacing for readability

  constructor(private router: Router, private http: HttpClient) {}

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
    return this.http.post(`${this.apiUrl}/signup/admin`, user).pipe(
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
