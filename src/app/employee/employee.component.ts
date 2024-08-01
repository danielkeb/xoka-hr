import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Employee, EmployeeService } from './employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule,ReactiveFormsModule, MatListModule, FormsModule, RouterModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit{
  constructor( private employeeService: EmployeeService, private fb: FormBuilder, private snackBar: MatSnackBar
    ) {}
  employeeForm!: FormGroup
  isLoading: boolean = false; // To handle the loading state
  errorMessage: string = '';
  

  ngOnInit() {
    this.employeeForm = this.fb.group({
      position: ['', Validators.required],
      departement: ['', Validators.required],
      salaryId: ['', [Validators.required, Validators.minLength(6)]],
      experience: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValues: Employee = this.employeeForm.value;
      this.employeeService.registerUser(formValues).subscribe(
        (response) => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
          });
          console.log('Registration successful!', response);
          // Handle success, e.g., navigate to login or dashboard
        },
        (error) => {
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000,
          });
          console.error('Registration failed!', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

 
  
}
