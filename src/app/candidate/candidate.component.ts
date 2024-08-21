import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidateService, Candidate } from './candidate.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CandidateManageComponent } from './candidate-manage/candidate-manage.component';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, RouterModule, CandidateManageComponent],
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
    <form [formGroup]="candidateForm" (ngSubmit)="onSubmit()">
      <div class="form-row">
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="candidateId">Candidate ID</label>
          <input
            type="text"
            class="form-control"
            formControlName="candidateId"
            id="candidateId"
            [ngClass]="{
              'is-invalid': candidateForm.get('candidateId')?.invalid && candidateForm.get('candidateId')?.touched
            }"
            placeholder="Candidate Id"
          />
          <!-- Error message for candidateId -->
          <div
            *ngIf="candidateForm.get('candidateId')?.invalid && candidateForm.get('candidateId')?.touched"
            class="invalid-feedback"
          >
            Position Id is required.
          </div>
        </div>
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="name">Candidate Status</label>
          <select
        id="status"
        formControlName="candidateStatus"
        class="form-select"
        [ngClass]="{
          'is-invalid':
            candidateForm.get('candidateStatus')?.invalid &&
            candidateForm.get('candidateStatus')?.touched
        }"
      >
        <option value="">Select Status</option>
        <option value="pending">pending</option>
        <option value="approved">Approve</option>
        <option value="rejected">Reject</option>
      </select>
          <!-- Error message for name -->
          <div
            *ngIf="candidateForm.get('candidateStatus')?.invalid && candidateForm.get('candidateStatus')?.touched"
            class="invalid-feedback"
          >
             candidate Status is required.
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-12 col-md-6 col-lg-4">
          <label for="resume">Resume</label>
          <input
             type="file"
                  id="resume"
                class="form-control"
                (change)="onFileChange($event)"
                [ngClass]="{
                      'is-invalid': candidateForm.get('resume')?.invalid && candidateForm.get('resume')?.touched
                 }"
                  />
          <!-- Error message for resume -->
          <div
            *ngIf="candidateForm.get('resume')?.invalid && candidateForm.get('resume')?.touched"
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
      <div class="form-group mt-4 d-flex justify-content-center mt-3">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</div>
`
,
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {
  items=[
    {
      id:'1',name:'create new Candidate',Link:'/dashboard/candidate'
    },
    {
      id:'2',name:'Manage', Link:'/dashboard/manage/candidate',
     
    },
    {
      id:'3', name: 'Update', Link:'/dashboard/candidate/update',
    },
    ]

    candidateForm!: FormGroup;
  successMessage: string = ''; // For success message
  errorMessage: string = '';   
  constructor(private fb: FormBuilder, private CandidateService: CandidateService) {}

  ngOnInit(): void {
    // Initialize the reactive form with validation
    this.candidateForm = this.fb.group({
      candidateId: ['', Validators.required],
      candidateStatus: ['', Validators.required],
      resume: ['', Validators.required],
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.candidateForm.patchValue({ resume: file });
      this.candidateForm.get('resume')?.updateValueAndValidity();
    }
  }
  onSubmit(): void {
    if (this.candidateForm.valid) {
      const formData = new FormData();
      const cand = this.candidateForm.value;
  
      for (const key in cand) {
        if (cand.hasOwnProperty(key)) {
          if (key === 'resume') {
            formData.append('file', cand[key], cand[key].name); // Use 'file' as the key
          } else {
            formData.append(key, cand[key]);
          }
        }
      }
  
      console.log('Submitting FormData:', formData);
  
      this.CandidateService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('candidate added successfully:', response);
          this.successMessage = "New candidate added";
          this.errorMessage = '';
          this.candidateForm.reset(); // Reset form after successful submission
        },
        error: (error) => {
          console.error('Error adding candidate:', error);
          console.error('Error details:', error.error);
          this.errorMessage = 'candidate create failed';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'please fill all fields';
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
