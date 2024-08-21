import { Component } from '@angular/core';
import { AttendanceService } from './attendance.service'; // Adjust the import path as needed
import { Attendance, AttendanceStatus } from './attendance.service'; // Ensure this matches your service export
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';
import { AuthService, Token } from '../services/app-context.service';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  standalone: true,
})
export class AttendanceComponent {
  attendances: Attendance[] = [];
  searchTerm: string = '';
  newAttendance: Attendance = {
    employeeId: '',
    date: new Date(),
    status: AttendanceStatus.PRESENT,
  };
  user: Token | null = null;
  attendanceStatuses = Object.values(AttendanceStatus);
  tableDisplay=false
  tableDisplayEmp=true

  constructor(private attendanceService: AttendanceService, private authService: AuthService,) {
    this.getAttendances();
  }

  ngOnInit(): void {
    this.user = this.authService.decodedToken;

    // Display menu items based on the user's role
    if (this.user) {
      this.filterTableDisplayByRole(this.user.role);

    }
  }

  private filterTableDisplayByRole(role: string): void {
    if (role === 'admin') {
      this.tableDisplay=true
      this.tableDisplayEmp=false
    } else if (role === 'employee') {
      this.tableDisplay=false
      
      
    } else if (role === 'candidate') {
      this.tableDisplay=false

    } else {
      // Handle any other roles if necessary

    }
  }

  getAttendances(): void {
    this.attendanceService.getAttendances()
      .pipe(
        tap(data => console.log('Fetched attendances:', data))
      )
      .subscribe(attendances => this.attendances = attendances);
  }

  searchAttendances(): void {
    if (this.searchTerm.trim() === '') {
      this.getAttendances();
      return;
    }

    this.attendanceService.searchAttendances(this.searchTerm)
      .pipe(
        tap(data => console.log('Searched attendances:', data))
      )
      .subscribe(attendances => this.attendances = attendances);
  }

  addAttendance(): void {
    if (!this.newAttendance.employeeId.trim()) {
      return;
    }

    this.attendanceService.addAttendance(this.newAttendance)
      .pipe(
        tap(data => console.log('Added attendance:', data))
      )
      .subscribe(attendance => {
        this.attendances.push(attendance);
        this.newAttendance = { employeeId: '', date: new Date(), status: AttendanceStatus.PRESENT };
      });
  }

  deleteAttendance(id: string): void {
    this.attendanceService.deleteAttendance(id)
      .pipe(
        tap(() => console.log('Deleted attendance with ID:', id))
      )
      .subscribe(() => {
        this.attendances = this.attendances.filter(a => a.employeeId !== id);
      });
  }
}
