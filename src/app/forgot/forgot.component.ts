import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ForgetService } from './forget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password',
  standalone:true,
  imports:[FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  forgotPasswordForm: FormGroup;
  emailSent = false;
  codeVerified = false;
  email = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forgetService: ForgetService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      shortcode: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordsMatch });
  }

  get emailControl() {
    return this.forgotPasswordForm.get('email');
  }

  get shortcodeControl() {
    return this.forgotPasswordForm.get('shortcode');
  }

  get newPasswordControl() {
    return this.forgotPasswordForm.get('newPassword');
  }

  get confirmPasswordControl() {
    return this.forgotPasswordForm.get('confirmPassword');
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    if (!this.emailSent) {
      this.email = this.emailControl?.value;
      this.forgetService.checkEmailExistence(this.email).subscribe({
        next: (response) => {
          if (response.exists) {
            this.emailSent = true;
            alert('Verification code sent to your email!');
          } else {
            this.emailSent = true;
            alert('Verification code sent to your email!');
          }
        },
        error: (err) => {
          alert(err);
        }
      });
    } else if (this.emailSent && !this.codeVerified) {
      const shortcode = this.shortcodeControl?.value;
      this.forgetService.verifyShortcode(this.email, shortcode).subscribe({
        next: (response) => {
          if (response.success) {
            this.codeVerified = true;
            alert('Shortcode verified successfully!');
          } else {
            alert('Invalid verification code');
          }
        },
        error: (err) => {
          alert(err);
        }
      });
    } else if (this.codeVerified) {
      const newPassword = this.newPasswordControl?.value;
      this.forgetService.updateResetPassword(this.email, newPassword).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Password updated successfully!');
            this.router.navigate(['/login']); // Redirect to login page
          } else {
            alert('Failed to update password');
          }
        },
        error: (err) => {
          alert(err);
        }
      });
    }
  }
}
