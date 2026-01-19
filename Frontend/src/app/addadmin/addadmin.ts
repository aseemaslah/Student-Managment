import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-addadmin',
  imports: [Adminsidebar, FormsModule],
  templateUrl: './addadmin.html',
  styleUrl: './addadmin.scss',
})
export class Addadmin {
  private adminService = inject(AdminService);
  
  adminData = {
    username: '',
    password: ''
  };

  onSubmit() {
    this.adminService.createAdmin(this.adminData).subscribe({
      next: (response) => {
        alert('Admin created successfully!');
        this.adminData = { username: '', password: '' };
      },
      error: (error) => {
        alert('Error creating admin: ' + error.message);
      }
    });
  }
}
