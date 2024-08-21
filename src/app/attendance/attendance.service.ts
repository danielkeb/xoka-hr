import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    ON_LEAVE = 'ON_LEAVE',
    HALF_DAY = 'HALF_DAY'
}
export interface Attendance{
        employeeId: string;
    
        date: Date;
    
        checkInTime?: Date;

        checkOutTime?: Date;
    
        status: AttendanceStatus;
    }

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private attendancesUrl = 'http://localhost:3333/attendance'; // Correct URL format

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET: Get all attendance records */
  getAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.attendancesUrl}/get`).pipe(
      tap((_) => console.log('fetched attendances')),
      catchError(this.handleError<Attendance[]>('getAttendances', []))
    );
  }

  /** GET: Get attendance by id */
  getAttendance(id: string): Observable<Attendance> {
    const url = `${this.attendancesUrl}/get/${id}`;
    return this.http.get<Attendance>(url).pipe(
      tap((_) => console.log(`fetched attendance id=${id}`)),
      catchError(this.handleError<Attendance>(`getAttendance id=${id}`))
    );
  }

  /** POST: Add a new attendance record */
  addAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.attendancesUrl}/add`, attendance, this.httpOptions).pipe(
      tap((newAttendance: Attendance) =>
        console.log(`added attendance for employeeId=${newAttendance.employeeId}`)
      ),
      catchError(this.handleError<Attendance>('addAttendance'))
    );
  }

  /** PUT: Update an existing attendance record */
  updateAttendance(attendance: Attendance): Observable<any> {
    return this.http.put(`${this.attendancesUrl}/update`, attendance, this.httpOptions).pipe(
      tap((_) => console.log(`updated attendance for employeeId=${attendance.employeeId}`)),
      catchError(this.handleError<any>('updateAttendance'))
    );
  }

  /** DELETE: Delete an attendance record */
  deleteAttendance(id: string): Observable<Attendance> {
    const url = `${this.attendancesUrl}/delete/${id}`;
    return this.http.delete<Attendance>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted attendance id=${id}`)),
      catchError(this.handleError<Attendance>('deleteAttendance'))
    );
  }

  /** GET: Search attendances by employee name */
  searchAttendances(term: string): Observable<Attendance[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Attendance[]>(`${this.attendancesUrl}/?employeeName=${term}`).pipe(
      tap((x) =>
        x.length
          ? console.log(`found attendances matching "${term}"`)
          : console.log(`no attendances matching "${term}"`)
      ),
      catchError(this.handleError<Attendance[]>('searchAttendances', []))
    );
  }

  /**
   * Handle HTTP operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
