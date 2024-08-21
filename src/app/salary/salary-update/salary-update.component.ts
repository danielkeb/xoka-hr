import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { User, Users, UsersService } from '../salary.service';

@Component({
  selector: 'app-salary-update',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './salary-update.component.html',
  styleUrls: ['./salary-update.component.scss'],
})
export class SalaryUpdateComponent implements OnInit {
  userForm!: FormGroup;
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  userId: string | null = null;
  isUpdateMode: boolean = false;
  items = [
    { id: '1', name: 'Create New Salary', Link: '/dashboard/salary' },
    { id: '2', name: 'Manage', Link: '/dashboard/manage/salary' },
    { id: '3', name: 'Update', Link: `/dashboard/update/salary/${this.userId}` },
  ];
 

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      salaryId: [{ value: '', disabled: true }],
      amount: ['', Validators.required],
      employeeId: ['', Validators.required],
    });


    this.registerForm = this.fb.group({
      salaryId: ['', Validators.required],
      amount: ['', Validators.required],
      employeeId: ['', Validators.required],
    });
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('salaryId');
      this.isUpdateMode = !!this.userId;
      if (this.isUpdateMode) {
        this.fetchUser(this.userId ?? '');
      } else {
        this.items[2].Link = '/dashboard/salary'; // Link for registration
      }

    });
  }

  fetchUser(userId: string): void {
    this.usersService.getUsersById(userId).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.items[2].Link = `/dashboard/update/salary/${userId}`;
      },
      error: (error) => {
        console.error('Error fetching salarys', error);
        this.errorMessage = 'Failed to fetch salary details.';
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


  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      const user = this.userForm.value;
      console.log('user list to update',user)

      // for (const key in user) {
      //   if (user.hasOwnProperty(key)) {
      //     if (key === 'image') {
      //       formData.append(key, user[key], user[key].name);
      //     } else {
      //       formData.append(key, user[key]);
      //     }
      //   }
      // }

      this.usersService.updateUser(this.userId, user).subscribe({
        next: (response) => {
          console.log('Salary updated successfully:', response);
          this.successMessage = 'Salary updated successfully.';
          this.errorMessage = '';

          if (response) {
            console.log('Salary User:', response);
          } else {
            console.log('No salary data returned from server.');
          }
        },
        error: (error) => {
          console.error('Error updating salary:', error);
          this.errorMessage = 'salary update failed.';
          this.successMessage = '';
        },
      });
    } else {

      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = '';
    }
  }

  onSubmitRegistration(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.usersService.registerUser(user).subscribe({
        next: (response) => {
          console.log('Salary registration successfully:', response);
          this.successMessage = 'salary created successfully.';
          this.errorMessage = '';

          if (response) {
            console.log('Salary:', response);
          } else {
            console.log('No salary data returned from server.');
          }
        },
        error: (error) => {
          console.error('Error departement:', error);
          this.errorMessage = 'Departement registiration failed.';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = '';
      this.registerForm.markAllAsTouched();
    }
  }

  //  // Function to check if the update link should be disabled
  //  isUpdateDisabled(item: any): boolean {
  //   // Replace this logic with the actual condition you want to check
  //   // For example, disable if salaryId is null or any other condition:
  //   if (item.id === '3') {
  //     return true; // Disable Update salary if salaryId is null
  //   }
  //   return false; // Enable link by default
  // }
  isUpdateDisabled(item: any): boolean {
    if (item.id === '3') {
      return !this.isUpdateMode; // Disable Update salary if salaryId is null
    }
    return false;
  }
}
