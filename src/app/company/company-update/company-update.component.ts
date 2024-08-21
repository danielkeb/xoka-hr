import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { User, Users, UsersService } from '../company.service';

@Component({
  selector: 'app-company-update',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss'],
})
export class CompanyUpdateComponent implements OnInit {
  userForm!: FormGroup;
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  userId: string | null = null;
  isUpdateMode: boolean = false;
  items = [
    { id: '1', name: 'Create New Company', Link: '/dashboard/company' },
    { id: '2', name: 'Manage Comp', Link: '/dashboard/manage/company' },
    { id: '3', name: 'Update Comp', Link: `/dashboard/update/company/${this.userId}` },
  ];
 

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      companyId: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      logo: [''],
      industry: ['', Validators.required],
      address: ['', Validators.required],
      
    });


    this.registerForm = this.fb.group({
      companyId: [ '', Validators.required ],
      name: ['', Validators.required],
     contact: ['', Validators.required],
      logo: ['', Validators.required],
      industry: ['', Validators.required],
      address: ['', Validators.required],
      
    });
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('companyId');
      this.isUpdateMode = !!this.userId;
      if (this.isUpdateMode) {
        this.fetchUser(this.userId ?? '');
      } else {
        this.items[2].Link = '/dashboard/company'; // Link for registration
      }

    });
  }

  fetchUser(userId: string): void {
    this.usersService.getUsersById(userId).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.items[2].Link = `/dashboard/update/company/${userId}`;
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
      this.registerForm.patchValue({ logo: file }); // Ensure logo field matches backend expectation
      this.registerForm.get('logo')?.updateValueAndValidity();
    }
  }

  onlogoChange(event: any){
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({ logo: file });
      this.userForm.get('logo')?.updateValueAndValidity();
    }
  }
  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.registerForm.patchValue({
  //       logo: file
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.userForm.valid && this.userId) {

      const formData = new FormData();
      const user = this.userForm.value;
      console.log('the data are here: ', formData)

      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          if (key === 'logo' && user[key] instanceof File) {
            // Ensure 'logo' is a File and append it correctly
            formData.append(key, user[key], user[key].name);
          } else if (user[key] !== null && user[key] !== undefined) {
            // Append only non-null, non-undefined values
            formData.append(key, user[key].toString());
          }
        }
      }

      this.usersService.updateUser(this.userId, formData).subscribe({
        next: (response) => {
          console.log('company profile updated successfully:', response);
          this.successMessage = 'company info updated successfully.';
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
      const formData = new FormData();
      const user = this.registerForm.value;

      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          if (key === 'logo' && user[key] instanceof File) {
            // Ensure 'logo' is a File and append it correctly
            formData.append(key, user[key], user[key].name);
          } else if (user[key] !== null && user[key] !== undefined) {
            // Append only non-null, non-undefined values
            formData.append(key, user[key].toString());
          }
        }
      }

      this.usersService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('company registration successfully:', response);
          this.successMessage = 'Company registration successfully.';
          this.errorMessage = '';

          if (response) {
            console.log('register Company:', response);
          } else {
            console.log('No company data returned from server.');
          }
        },
        error: (error) => {
          console.error('Error updating compay:', error);
          this.errorMessage = 'company update failed.';
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
