import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  employeeId: string;
  experience: string;
}

export interface Employees {
  employeeId: string;
  experience: string;
  users:{
    firstName: string,
    middleName: string,
    gender: string,
    age: string,
  },
  position:[{
    name: string,
  }],
  departement:[{
    name: string,
  }]

  salary:[{
    amount: string,
  }],


}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3333/employee'; // Your API URL

  constructor(private http: HttpClient) {}

  getPositions(): Observable<Employees[]> {
    return this.http.get<Employees[]>(`${this.apiUrl}/get`);
  }

  getPositionById(positionId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/get/${positionId}`);
  }

  updatePosition(positionId: string, position: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/update/${positionId}`, position);
  }

  deletePosition(positionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${positionId}`);
  }
}
