import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { User, Users, UsersService } from '../departement.service';

@Component({
  selector: 'app-departement-update',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './departement-update.component.html',
  styleUrls: ['./departement-update.component.scss'],
})
export class DepartementUpdateComponent implements OnInit {
  userForm!: FormGroup;
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  userId: string | null = null;
  isUpdateMode: boolean = false;
  items = [
    { id: '1', name: 'Create New Departement', Link: '/dashboard/departement' },
    { id: '2', name: 'Manage Dept', Link: '/dashboard/manage/departement' },
    { id: '3', name: 'Update Dept', Link: `/dashboard/update/departement/${this.userId}` },
  ];
 

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      departementId: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      employeeId: ['', Validators.required],
    });


    this.registerForm = this.fb.group({
      departementId: ['', Validators.required],
      name: ['', Validators.required],
      employeeId: ['', Validators.required],
    });
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('departementId');
      this.isUpdateMode = !!this.userId;
      if (this.isUpdateMode) {
        this.fetchUser(this.userId ?? '');
      } else {
        this.items[2].Link = '/dashboard/departement'; // Link for registration
      }

    });
  }

  fetchUser(userId: string): void {
    this.usersService.getUsersById(userId).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.items[2].Link = `/dashboard/update/departement/${userId}`;
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


  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      const user = this.userForm.value;

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
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.usersService.registerUser(user).subscribe({
        next: (response) => {
          console.log('Dpt registration successfully:', response);
          this.successMessage = 'dpt created successfully.';
          this.errorMessage = '';

          if (response) {
            console.log('departement:', response);
          } else {
            console.log('No user data returned from server.');
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
  //   // For example, disable if userId is null or any other condition:
  //   if (item.id === '3') {
  //     return true; // Disable Update User if userId is null
  //   }
  //   return false; // Enable link by default
  // }
  isUpdateDisabled(item: any): boolean {
    if (item.id === '3') {
      return !this.isUpdateMode; // Disable Update User if userId is null
    }
    return false;
  }
}
