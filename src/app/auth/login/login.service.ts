import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  user_role: string; // Added user role to response
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/auth/signin'; // API endpoint
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable(); // Observable for user role

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      map(response => {
        // Store the token and user role
        localStorage.setItem('token', response.access_token);
        this.userRoleSubject.next(response.user_role);
        return true;
      }),
      catchError(error => {
        // Handle login errors
        console.error('Login failed', error);
        return of(false); // Return an observable of false
      })
    );
  }

  logout(): void {
    // Remove token from localStorage and navigate to login page
    localStorage.removeItem('token');
    this.userRoleSubject.next(''); // Clear user role
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Check if token exists in localStorage
    return !!localStorage.getItem('token');
  }
}
