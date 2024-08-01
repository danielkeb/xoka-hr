import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: any; // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  
  constructor(private router: Router) {}

  // Get the current token
  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Set a new token
  set token(value: string | null) {
    if (value) {
      localStorage.setItem(this.tokenKey, value);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  get decodedToken(): JwtPayload | null {
    const token = this.token;
    if (token) {
      return jwtDecode.jwtDecode(token) as JwtPayload;
    }
    return null;
  }

  // Logout and navigate to login page
  logout(): void {
    this.token = null;
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Check if token exists
  hasToken(): boolean {
    return !!this.token;
  }
}