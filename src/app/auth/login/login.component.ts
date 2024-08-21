import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage=''
  successMessage= ''

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isLoading = true;
      this.loginService.login(email, password).subscribe(
        success => {
          this.isLoading = false;
          if (success) {
            this.router.navigate(['/dashboard']);
            this.successMessage='Login successful!'
            this.errorMessage = '';
            console.log('Login successful!');
          } else {
            this.successMessage=''
            this.errorMessage = 'Invalid email or password.';
            console.error('Login failed!');
          }
        },
        error => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred. Please try again later.';
          this.successMessage=''
          console.error('Login error:', error);
        }
      );
    }
  }
}
