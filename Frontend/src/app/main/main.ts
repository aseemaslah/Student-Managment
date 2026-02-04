import { Component, inject } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from '../footer/footer';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (res) => {
          console.log('Login response:', res);
          if (res && res.user && res.user.role) {
            const role = res.user.role;
            if (role === 'Admin') this.router.navigate(['/admin']);
            if (role === 'Teacher') this.router.navigate(['/teacher']);
            if (role === 'Student') this.router.navigate(['/student']);
          } else {
            console.error('Invalid response structure:', res);
            alert('Login failed - invalid response');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          alert('Invalid credentials');
        }
      });
  }
}
