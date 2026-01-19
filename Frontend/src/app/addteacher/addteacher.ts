import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { AdminService } from '../services/admin-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addteacher',
  imports: [Adminsidebar,FormsModule],
  templateUrl: './addteacher.html',
  styleUrl: './addteacher.scss',
})
export class Addteacher {
  teacherData = {
    username: '',
    password: ''
  };

  private adminService = inject(AdminService)

  createTeacher() {
    this.adminService.createTeacher(this.teacherData)
      .subscribe({
        next: () => {
          alert('Teacher created successfully');
 
        },
        error: (err) => {
          console.error(err);
          alert('Error creating teacher');
        }
      });
  }
}