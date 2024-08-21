import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { RegistrationService, AuthDto } from './register.service';
import { MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    MatCardModule,
    
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  roles: string[] = ['Employee', 'Candidate']; 
  statuses: string[] = ['Active', 'Inactive', 'Pending']; 
  candidateStatuses: string[] = ['Shortlisted', 'Interviewed', 'Offered', 'Rejected'];
  genders: string[] = ['Male', 'Female', 'Other']; 

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar
  ) {}
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ image: file });
      this.registerForm.get('image')?.updateValueAndValidity();
    }
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      status: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],
      image: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValues: AuthDto = this.registerForm.value;
      this.registrationService.registerUser(formValues).subscribe(
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