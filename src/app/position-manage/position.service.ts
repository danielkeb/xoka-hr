import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Position {
  positionId: string;
  name: string;
  employeeId: string;
  workArea: string;
}

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private apiUrl = 'http://localhost:3333/position'; // Your API URL

  constructor(private http: HttpClient) {}

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiUrl}/get`);
  }

  getPositionById(positionId: string): Observable<Position> {
    return this.http.get<Position>(`${this.apiUrl}/get/${positionId}`);
  }

  updatePosition(positionId: string, position: Partial<Position>): Observable<Position> {
    return this.http.patch<Position>(`${this.apiUrl}/update/${positionId}`, position);
  }

  deletePosition(positionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${positionId}`);
  }
}
