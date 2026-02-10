import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { AdminService } from '../services/admin-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addteacher',
  imports: [Adminsidebar, FormsModule],
  templateUrl: './addteacher.html',
  styleUrl: './addteacher.scss',
})
export class Addteacher {
  teacherData = {
    username: '',
    password: ''
  };

  private adminService = inject(AdminService)
  private router = inject(Router)

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  createTeacher() {

    if (!this.teacherData.username || !this.teacherData.password) {
      alert('Please fill all required fields');
      return;
    }
    this.adminService.createTeacher(this.teacherData)
      .subscribe({

        next: () => {
          alert('Teacher created successfully');
          this.router.navigate(['/viewteachers']);

        },


        error: (err) => {
          console.error(err);
          alert('Error creating teacher');
        }
      });
  }
}