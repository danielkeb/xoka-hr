import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PositionService, Position } from './position.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';
import { PositionManageComponent } from '../position-manage/position-manage.component';

@Component({
  selector: 'app-position',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, UserComponent, RouterModule, PositionManageComponent],
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
<!-- <app-user></app-user> -->
<div class="container mt-4 ">
  <div class="form-container ">
    <form [formGroup]="positionForm" (ngSubmit)="onSubmit()">
      <div class="form-row">
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="positionId">Position Id</label>
          <input
            type="text"
            class="form-control"
            formControlName="positionId"
            id="positionId"
            [ngClass]="{
              'is-invalid': positionForm.get('positionId')?.invalid && positionForm.get('positionId')?.touched
            }"
            placeholder="Position Id"
          />
          <!-- Error message for positionId -->
          <div
            *ngIf="positionForm.get('positionId')?.invalid && positionForm.get('positionId')?.touched"
            class="invalid-feedback"
          >
            Position Id is required.
          </div>
        </div>
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="name">Position Name</label>
          <input
            type="text"
            class="form-control"
            formControlName="name"
            id="name"
            placeholder="Position Name"
          />
          <!-- Error message for name -->
          <div
            *ngIf="positionForm.get('name')?.invalid && positionForm.get('name')?.touched"
            class="invalid-feedback"
          >
            Position Name is required.
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="workArea">Work Area</label>
          <input
            type="text"
            class="form-control"
            formControlName="workArea"
            id="workArea"
            placeholder="Work Area"
          />
          <!-- Error message for workArea -->
          <div
            *ngIf="positionForm.get('workArea')?.invalid && positionForm.get('workArea')?.touched"
            class="invalid-feedback"
          >
            Work Area is required.
          </div>
        </div>
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="employeeId">Employee Id</label>
          <input
            type="text"
            class="form-control"
            formControlName="employeeId"
            id="employeeId"
            placeholder="Employee Id"
          />
          <!-- Error message for employeeId -->
          <div
            *ngIf="positionForm.get('employeeId')?.invalid && positionForm.get('employeeId')?.touched"
            class="invalid-feedback"
          >
            Employee Id is required.
          </div>
        </div>
      </div>
      <div *ngIf="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div *ngIf="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
      <div class="form-group mt-4 d-flex justify-content-center mt-3">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>
`
,
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent {
  items=[
    {
      id:'1',name:'create new position',Link:'/dashboard/position'
    },
    {
      id:'2',name:'manage', Link:'/dashboard/manage',
     
    },
    {
      id:'3', name: 'Update', Link:'/dashboard/position/update',
    },
    ]

    positionForm!: FormGroup;
  successMessage: string = ''; // For success message
  errorMessage: string = '';   
  constructor(private fb: FormBuilder, private positionService: PositionService) {}

  ngOnInit(): void {
    // Initialize the reactive form with validation
    this.positionForm = this.fb.group({
      positionId: ['', Validators.required],
      name: ['', Validators.required],
      workArea: ['', Validators.required],
      employeeId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.positionForm.valid) {
      const position: Position = this.positionForm.value;
      this.positionService.registerUser(position).subscribe({
        next: (response) => {
          console.log('Position added successfully:', response);
          this.successMessage="New position added";
          this.errorMessage = '';
          this.positionForm.reset(); // Reset form after successful submission
        },
        error: (error) => {
          console.error('Error adding position:', error);
          this.errorMessage='position create failed';
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
