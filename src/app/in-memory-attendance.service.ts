import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export interface Attendance {
  id: number;
  date: string;
  employeeId: number;
  employeeName: string;
  status: string;  // 'Present', 'Absent', 'Leave', etc.
}

@Injectable({
  providedIn: 'root',
})
export class InMemoryAttendanceService implements InMemoryDbService {
  createDb() {
    const attendances: Attendance[] = [
      { id: 1, date: '2024-08-01', employeeId: 101, employeeName: 'Alice', status: 'Present' },
      { id: 2, date: '2024-08-01', employeeId: 102, employeeName: 'Bob', status: 'Absent' },
      { id: 3, date: '2024-08-01', employeeId: 103, employeeName: 'Charlie', status: 'Leave' },
      { id: 4, date: '2024-08-02', employeeId: 101, employeeName: 'Alice', status: 'Present' },
      { id: 5, date: '2024-08-02', employeeId: 102, employeeName: 'Bob', status: 'Present' },
      { id: 6, date: '2024-08-02', employeeId: 103, employeeName: 'Charlie', status: 'Present' },
      { id: 7, date: '2024-08-03', employeeId: 101, employeeName: 'Alice', status: 'Absent' },
      { id: 8, date: '2024-08-03', employeeId: 102, employeeName: 'Bob', status: 'Present' },
      { id: 9, date: '2024-08-03', employeeId: 103, employeeName: 'Charlie', status: 'Leave' },
    ];

    return { attendances };
  }

  // Optional: Method to generate new IDs for attendance records
  genId(attendances: Attendance[]): number {
    return attendances.length > 0 ? Math.max(...attendances.map(a => a.id)) + 1 : 1;
  }
}
