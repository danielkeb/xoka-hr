import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



// Define the interface for AuthDto
export interface AuthDto {
  userId  :    String
  firstName  : String
  middleName: String
  lastName   : String
  email      : String
  phoneNumber: String
  status     : String    
  password   : String     
  gender     : String     
  role       : String     
  age         : String
  address    : String
  image      : String
}

// Injectable service for registration
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3333/user/registration';

  constructor(private http: HttpClient) {}

  // Method to register user
  registerUser(user: AuthDto): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
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
