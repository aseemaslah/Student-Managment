import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-createclass',
  imports: [Adminsidebar, FormsModule],
  templateUrl: './createclass.html',
  styleUrl: './createclass.scss',
})
export class Createclass {
  private adminService = inject(AdminService);
  
  classData = {
    Class: '',
    Division: '',
    AcademicYear: ''
  };

  onSubmit() {
    console.log('Submitting class data:', this.classData);
    this.adminService.createClass(this.classData).subscribe({
      next: (response) => {
        console.log('Success response:', response);
        alert('Class created successfully!');
        this.classData = { Class: '', Division: '', AcademicYear: '' };
      },
      error: (error) => {
        console.error('Full error object:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        alert('Error creating class. Check console for details.');
      }
    });
  }
}
