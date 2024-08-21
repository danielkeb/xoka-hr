import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService, Employee } from './employee.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, UserComponent, RouterModule, EmployeeManageComponent],
  template: `<ul class="nav nav-tabs mt-2">
  <li class="nav-item" *ngFor="let item of items">
    <a
      class="nav-link"
      [routerLink]="!isUpdateDisabled(item) ? item.Link : null"
      [class.disabled]="isUpdateDisabled(item)"
      [attr.aria-disabled]="isUpdateDisabled(item) ? 'true' : null"
      [routerLinkActive]="!isUpdateDisabled(item) ? 'active' : ''"
    >
      {{ item.name }}
    </a>
  </li>
</ul>

<div class="container mt-4">
  <div class="form-container">
    <form [formGroup]="positionForm" (ngSubmit)="onSubmit()">
      <div class="form-row">
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="employeeId">Employee ID</label>
          <input
            type="text"
            class="form-control"
            formControlName="employeeId"
            id="employeeId"
            [ngClass]="{
              'is-invalid': positionForm.get('employeeId')?.invalid && positionForm.get('employeeId')?.touched
            }"
            placeholder="Employee ID"
          />
          <!-- Error message for employeeId -->
          <div
            *ngIf="positionForm.get('employeeId')?.invalid && positionForm.get('employeeId')?.touched"
            class="invalid-feedback"
          >
            Employee ID is required.
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <label for="departement" class="form-label">Department</label>
          <select
            id="departement"
            formControlName="departement"
            class="form-select"
          >
            <option value="departement">Select Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Accounting">Accounting</option>
          </select>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="experience">Experience</label>
          <input
            type="text"
            class="form-control"
            formControlName="experience"
            id="experience"
            placeholder="Experience"
          />
          <!-- Error message for experience -->
          <div
            *ngIf="positionForm.get('experience')?.invalid && positionForm.get('experience')?.touched"
            class="invalid-feedback"
          >
            Experience is required.
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <label for="position" class="form-label">Position</label>
          <select
            id="position"
            formControlName="position"
            class="form-select"
          >
            <option value="position">Select Position</option>
            <option value="Team leader">Team Leader</option>
            <option value="Manager">Manager</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
      </div>
      
      <div *ngIf="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div *ngIf="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
      
      <div class="form-group mt-4 d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>`
,
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  items=[
    {
      id:'1',name:'create new position',Link:'/dashboard/employee'
    },
    {
      id:'2',name:'manage', Link:'/dashboard/manage',
     
    },
    {
      id:'3', name: 'Update', Link:'/dashboard/employee/update',
    },
    ]

    positionForm!: FormGroup;
  successMessage: string = ''; // For success message
  errorMessage: string = '';   
  constructor(private fb: FormBuilder, private positionService: EmployeeService) {}

  ngOnInit(): void {
    // Initialize the reactive form with validation
    this.positionForm = this.fb.group({
      employeeId: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.positionForm.valid) {
      const position: Employee = this.positionForm.value;
      this.positionService.registerUser(position).subscribe({
        next: (response) => {
          console.log('Employee added successfully:', response);
          this.successMessage="New Employee added";
          this.errorMessage = '';
          this.positionForm.reset(); // Reset form after successful submission
        },
        error: (error) => {
          console.error('Error adding employee:', error);
          this.errorMessage='employee create failed';
          this.successMessage='';
        },
      });
    } else {
      this.errorMessage='please fill all field';
      this.successMessage='';
    }
  }
  isUpdateDisabled(item: any): boolean {
    // Replace this logic with the actual condition you want to check
    // For example, disable if userId is null or any other condition:
    if (item.id === '3') {
      return true; // Disable Update User if userId is null
    }
    return false; // Enable link by default
  }
  
}
