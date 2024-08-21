import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



// Define the interface for AuthDto
export interface Position{
  positionId  :    String
  name  : String
  employeeId: String
  workArea   : String
}

// Injectable service for Employee
@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private apiUrl = 'http://localhost:3333/position/add';

  constructor(private http: HttpClient) {}

  // Method to register user
  registerUser(user: Position): Observable<any> {
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
