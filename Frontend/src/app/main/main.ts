import { Component, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [Footer, CommonModule, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  errorMessage: string = '';
  loading: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  login(form: NgForm) {

    if (form.invalid) return;

    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.username, this.password)
      .subscribe({
        next: (res) => {
          this.loading = false;

          if (res?.user?.role) {
            const role = res.user.role;

            if (role === 'Admin') this.router.navigate(['/admin']);
            if (role === 'Teacher') this.router.navigate(['/teacher']);
            if (role === 'Student') this.router.navigate(['/student']);
          } else {
            this.errorMessage = 'Invalid response from server';
          }
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
