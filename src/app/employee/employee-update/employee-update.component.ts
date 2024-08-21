import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee-manage/empoyee.service';
import { Employee } from '../employee.service';


@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  template: `<ul class="nav nav-tabs mt-2">
  <li class="nav-item"  *ngFor="let item of items">
    <a class="nav-link active" [routerLink]="item.Link" routerLinkActive="active">{{item.name}}</a>
  </li>
</ul>
<div class="form-container">
  <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
    <div class="form-row mt-4">
      <div class="form-group col-md-4">
        <label for="employeeId">Employee Id</label>
        <input
          type="text"
          class="form-control"
          formControlName="employeeId"
          id="employeeId"
          [ngClass]="{
            'is-invalid':
              editForm.get('employeeId')?.invalid &&
              editForm.get('employeeId')?.touched
          }"
          placeholder="Employee Id"
        />
        <!-- Error message for employeeId -->
        <div
          *ngIf="
            editForm.get('employeeId')?.invalid &&
            editForm.get('employeeId')?.touched
          "
          class="invalid-feedback"
        >
          Employee Id is required.
        </div>
      </div>
  
    <div class="form-group col-md-4">
      <label for="experience">Experience</label>
      <input
        type="text"
        class="form-control"
        formControlName="experience"
        id="experience"
        placeholder="1234 Main St"
      />
      <!-- Error message for experience -->
      <div
        *ngIf="
          editForm.get('experience')?.invalid &&
          editForm.get('experience')?.touched
        "
        class="invalid-feedback"
      >
        Experience is required.
      </div>
      </div>
   
    
      
     
    </div>
    <div *ngIf="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
    <div *ngIf="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
    <div class="button-container d-flex justify-content-center mt-3">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    
  </form>
  </div>`,
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  editForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  employeeId: string | null = null;

  items = [
    { id: '1', name: 'Create New Position', Link: '/dashboard/employee' },
    { id: '2', name: 'Manage', Link: '/dashboard/manage' },
    { id: '3', name: 'Update', Link: `/dashboard/update/${this.employeeId}` }
  ];

  constructor(
    private fb: FormBuilder,
    private positionService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.editForm = this.fb.group({
      employeeId: [{ value: '', disabled: true }],
      experience: ['', Validators.required],
    });

    // Fetch position data if employeeId is provided
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('employeeId');
      if (this.employeeId) {
        this.fetchPosition(this.employeeId);
      }
    });
  }

  fetchPosition(employeeId: string): void {
    this.positionService.getPositionById(employeeId).subscribe({
      next: (position) => {
        this.editForm.patchValue(position);
        this.items[2].Link = `/dashboard/update/${employeeId}`;
      },
      error: (error) => {
        console.error('Error fetching position', error);
        this.errorMessage = 'Failed to fetch position details.';
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.employeeId) {
      const employee: Employee = this.editForm.value;
      this.positionService.updatePosition(this.employeeId, employee).subscribe({
        next: (response) => {
          console.log('Position updated successfully:', response);
          this.successMessage = 'Position updated successfully.';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating position:', error);
          this.errorMessage = 'Position update failed.';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = '';
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
