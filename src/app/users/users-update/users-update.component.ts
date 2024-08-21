import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { User, Users, UsersService } from '../users.service';

@Component({
  selector: 'app-users-update',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.scss'],
})
export class UsersUpdateComponent implements OnInit {
  userForm!: FormGroup;
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  userId: string | null = null;
  isUpdateMode: boolean = false;
  items = [
    { id: '1', name: 'Create New Users', Link: '/dashboard/users' },
    { id: '2', name: 'Manage', Link: '/dashboard/manage/users' },
    { id: '3', name: 'Update User', Link: `/dashboard/update/users/${this.userId}` },
  ];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: [{ value: '', disabled: true }, Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern(/^\+?[0-9]{10,12}$/)],
      status: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],
      image: [null, Validators.required],
    });
    

    this.registerForm = this.fb.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern(/^\+?[0-9]{10,12}$/)],
      status: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
      this.isUpdateMode = !!this.userId;
      if (this.isUpdateMode) {
        this.fetchUser(this.userId ?? '');
      } else {
        this.items[2].Link = '/dashboard/users'; // Link for registration
      }
    });
  }

  fetchUser(userId: string): void {
    this.usersService.getUsersById(userId).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.items[2].Link = `/dashboard/update/users/${userId}`;
      },
      error: (error) => {
        console.error('Error fetching users', error);
        this.errorMessage = 'Failed to fetch user details.';
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ image: file });
      this.registerForm.get('image')?.updateValueAndValidity();
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({ image: file });
      this.userForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    console.log('Form Value:', this.userForm.value);
    console.log('Form Status:', this.userForm.status);
    if (this.userForm.valid && this.userId) {
    
      const formData = new FormData();
      const user = this.userForm.value;

 

for (const key in user) {
  if (user.hasOwnProperty(key)) {
    if (key === 'image' && user[key]) {
      formData.append(key, user[key], user[key].name);
    } else {
      formData.append(key, user[key]);
    }
  }
}


      // Log the formData to console
      console.log('Submitting update with formData:', formData);

      this.usersService.updateUser(this.userId, formData).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.successMessage = 'User updated successfully.';
          this.errorMessage = '';

          if (response) {
            console.log('Updated User:', response);
          } else {
            console.log('No user data returned from server.');
          }
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'User update failed.';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = '';
    }
  }

  onSubmitRegistration(): void {
    console.log('Form Value:', this.registerForm.value);
    console.log('Form Status:', this.registerForm.status);
    if (this.registerForm.valid) {
      const formData = new FormData();
      const user = this.registerForm.value;

      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          if (key === 'image' && user[key]) {
            formData.append(key, user[key], user[key].name);
          } else {
            formData.append(key, user[key]);
          }
        }
      }

      // Log the formData to console
      console.log('Submitting registration with formData:', formData);

      this.usersService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('User registration successfully:', response);
          this.successMessage = 'User registration successfully.';
          this.errorMessage = '';

          if (response) {
            console.log('Registered User:', response);
          } else {
            console.log('No user data returned from server.');
          }
        },
        error: (error) => {
          console.error('Error registering user:', error);
          this.errorMessage = 'User register failed.';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = '';
      this.registerForm.markAllAsTouched();
    }
  }

  isUpdateDisabled(item: any): boolean {
    if (item.id === '3') {
      return !this.isUpdateMode; // Disable Update User if userId is null
    }
    return false;
  }
}
