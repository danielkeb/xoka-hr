import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Candidate, CandidateService } from '../candidate-manage/candidate.service';

@Component({
  selector: 'app-candidate-update',
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
        <label for="candidateId">Candidate Id</label>
        <input
          type="text"
          class="form-control"
          formControlName="candidateId"
          id="candidateId"
          [ngClass]="{
            'is-invalid':
              editForm.get('candidateId')?.invalid &&
              editForm.get('candidateId')?.touched
          }"
          placeholder="Candidate Id"
        />
        <!-- Error message for candidateId -->
        <div
          *ngIf="
            editForm.get('candidateId')?.invalid &&
            editForm.get('candidateId')?.touched
          "
          class="invalid-feedback"
        >
          Position Id is required.
        </div>
      </div>
      <div class="form-group col-md-4">
        <label for="name">Candidate Status</label>
        <select
        id="status"
        formControlName="candidateStatus"
        class="form-select"
        [ngClass]="{
          'is-invalid':
            editForm.get('candidateStatus')?.invalid &&
            editForm.get('candidateStatus')?.touched
        }"
      >
        <option value="">Select Status</option>
        <option value="pending">pending</option>
        <option value="approved">Approve</option>
        <option value="rejected">Reject</option>
      </select>
        <!-- Error message for candidateStatus -->
        <div
          *ngIf="
            editForm.get('candidateStatus')?.invalid &&
            editForm.get('candidateStatus')?.touched
          "
          class="invalid-feedback"
        >
          Position candidateStatus is required.
        </div>
      </div>
    </div>
    <div class="form-row mt-4">
    <div class="form-group col-md-4">
      <label for="resume">Resume</label>
      <input
             type="file"
                  id="resume"
                class="form-control"
                (change)="onFileChange($event)"
                [ngClass]="{
                      'is-invalid': editForm.get('resume')?.invalid && editForm.get('resume')?.touched
                 }"
                  />
      <!-- Error message for resume -->
      <div
        *ngIf="
          editForm.get('resume')?.invalid &&
          editForm.get('resume')?.touched
        "
        class="invalid-feedback"
      >
        Resume is required.
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
  styleUrls: ['./candidate-update.component.scss']
})
export class CandidateUpdateComponent implements OnInit {
  editForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  candidateId: string | null = null;

  items = [
    { id: '1', name: 'Create New Candidate', Link: '/dashboard/candidate' },
    { id: '2', name: 'Manage', Link: '/dashboard/manage/candidate' },
    { id: '3', name: 'Update', Link: `/dashboard/update/candidate/${this.candidateId}` }
  ];

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.editForm = this.fb.group({
      candidateId: [{ value: '', disabled: true }],
      candidateStatus: ['', Validators.required],
      resume: ['', Validators.required],
    });

    // Fetch position data if candidateId is provided
    this.route.paramMap.subscribe(params => {
      this.candidateId = params.get('candidateId');
      if (this.candidateId) {
        this.fetchCandidate(this.candidateId);
      }
    });
  }

 

  fetchCandidate(candidateId: string): void {
    this.candidateService.getCandidateById(candidateId).subscribe({
      next: (candidate) => {
        this.editForm.patchValue(candidate);
        this.items[2].Link = `/dashboard/update/candidate/${candidateId}`;
      },
      error: (error) => {
        console.error('Error fetching candidate', error);
        this.errorMessage = 'Failed to fetch candidate details.';
      }
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editForm.patchValue({ resume: file });
      this.editForm.get('resume')?.updateValueAndValidity();
    }
  }
  onSubmit(): void {
    if (this.editForm.valid && this.candidateId) {
        const formData = new FormData();
        const user = this.editForm.value;
  
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            if (key === 'resume') {
              formData.append('file', user[key], user[key].name);
            } else {
              formData.append(key, user[key]);
            }
          }
        }
      this.candidateService.updateCandidate(this.candidateId, formData).subscribe({
        next: (response) => {
          console.log('Candidate updated successfully:', response);
          this.successMessage = 'Candidate updated successfully.';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating Candidate:', error);
          this.errorMessage = 'Candidate update failed.';
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
