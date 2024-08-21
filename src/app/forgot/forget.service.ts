import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {

  private toCheckEmailExistence = 'http://localhost:3333/auth/forget/shortcode';
  private toVerifyShortcode = 'http://localhost:3333/verify/shortcode';
  private toUpdateResetPassword = 'http://localhost:3333/auth/resetpassword';

  constructor(private http: HttpClient) {}

  checkEmailExistence(email: string): Observable<any> {
    return this.http.post<any>(this.toCheckEmailExistence, { email })
      .pipe(
        catchError(this.handleError)
      );
  }

  verifyShortcode(email: string, shortcode: string): Observable<any> {
    return this.http.post<any>(this.toVerifyShortcode, { email, shortcode })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateResetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.patch<any>(this.toUpdateResetPassword, { email, newPassword })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
