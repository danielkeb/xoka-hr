import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Position, PositionService } from '../../position-manage/position.service';

@Component({
  selector: 'app-position-update',
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
        <label for="positionId">Position Id</label>
        <input
          type="text"
          class="form-control"
          formControlName="positionId"
          id="positionId"
          [ngClass]="{
            'is-invalid':
              editForm.get('positionId')?.invalid &&
              editForm.get('positionId')?.touched
          }"
          placeholder="position Id"
        />
        <!-- Error message for positionId -->
        <div
          *ngIf="
            editForm.get('positionId')?.invalid &&
            editForm.get('positionId')?.touched
          "
          class="invalid-feedback"
        >
          Position Id is required.
        </div>
      </div>
      <div class="form-group col-md-4">
        <label for="name">Position Name</label>
        <input
          type="text"
          class="form-control"
          formControlName="name"
          id="name"
          placeholder="position Name"
        />
        <!-- Error message for name -->
        <div
          *ngIf="
            editForm.get('name')?.invalid &&
            editForm.get('name')?.touched
          "
          class="invalid-feedback"
        >
          Position Name is required.
        </div>
      </div>
    </div>
    <div class="form-row mt-4">
    <div class="form-group col-md-4">
      <label for="workArea">Work Area</label>
      <input
        type="text"
        class="form-control"
        formControlName="workArea"
        id="workArea"
        placeholder="1234 Main St"
      />
      <!-- Error message for workArea -->
      <div
        *ngIf="
          editForm.get('workArea')?.invalid &&
          editForm.get('workArea')?.touched
        "
        class="invalid-feedback"
      >
        Work Area is required.
      </div>
    </div>
   
    
      <div class="form-group col-md-4">
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
          *ngIf="
            editForm.get('employeeId')?.invalid &&
            editForm.get('employeeId')?.touched
          "
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
    <div class="button-container d-flex justify-content-center mt-3">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
    
  </form>
  </div>`,
  styleUrls: ['./position-update.component.scss']
})
export class PositionUpdateComponent implements OnInit {
  editForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  positionId: string | null = null;

  items = [
    { id: '1', name: 'Create New Position', Link: '/dashboard/position' },
    { id: '2', name: 'Manage', Link: '/dashboard/manage' },
    { id: '3', name: 'Update', Link: `/dashboard/update/${this.positionId}` }
  ];

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.editForm = this.fb.group({
      positionId: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      workArea: ['', Validators.required],
      employeeId: ['', Validators.required],
    });

    // Fetch position data if positionId is provided
    this.route.paramMap.subscribe(params => {
      this.positionId = params.get('positionId');
      if (this.positionId) {
        this.fetchPosition(this.positionId);
      }
    });
  }

  fetchPosition(positionId: string): void {
    this.positionService.getPositionById(positionId).subscribe({
      next: (position) => {
        this.editForm.patchValue(position);
        this.items[2].Link = `/dashboard/update/${positionId}`;
      },
      error: (error) => {
        console.error('Error fetching position', error);
        this.errorMessage = 'Failed to fetch position details.';
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.positionId) {
      const position: Position = this.editForm.value;
      this.positionService.updatePosition(this.positionId, position).subscribe({
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
