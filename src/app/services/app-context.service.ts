import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Correct named import

export interface Token {
  sub: string;
  role: string;
  name: string;
  email: string;
  status: string;
  iat?: number;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private router: Router) {}

  // Get the current token from localStorage
  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Set a new token in localStorage
  set token(value: string | null) {
    if (value) {
      localStorage.setItem(this.tokenKey, value);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Decode the JWT token
  get decodedToken(): Token | null {
    const token = this.token;
    if (token) {
      try {
        return jwtDecode<Token>(token); // Correctly use jwtDecode with generics
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

  // Logout and navigate to login page
  logout(): void {
    this.token = null;
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated by verifying the token and expiration
  isAuthenticated(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }

    const decoded = this.decodedToken;
    if (!decoded || !decoded.exp) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  // Check if token exists
  hasToken(): boolean {
    return !!this.token;
  }
}
