import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Adminsidebar } from '../adminsidebar/adminsidebar';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-createclass',
  standalone: true,
  imports: [Adminsidebar, FormsModule],
  templateUrl: './createclass.html',
  styleUrl: './createclass.scss',
})
export class Createclass implements OnInit {

  private adminService = inject(AdminService);

  // Form model
  classData = {
    Class: '',
    Division: '',
    AcademicYear: ''
  };

  // Dropdown data
  classes: number[] = [];
  divisions: string[] = [];
  academicYears: string[] = [];

  ngOnInit(): void {
    this.generateClasses();
    this.generateDivisions();
    this.generateAcademicYears();
  }

  // Class: 1–12
  private generateClasses() {
    this.classes = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  // Division: A–Z
  private generateDivisions() {
    this.divisions = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
  }

  // Academic Year: current → next 5 years
  private generateAcademicYears() {
    const currentYear = new Date().getFullYear();
    this.academicYears = [];

    for (let i = 0; i < 6; i++) {
      this.academicYears.push(
        `${currentYear + i} - ${currentYear + i + 1}`
      );
    }
  }

  // Submit
  onSubmit() {
    console.log('Submitting class data:', this.classData);

    this.adminService.createClass(this.classData).subscribe({
      next: (response) => {
        console.log('Success response:', response);
        alert('Class created successfully!');

        // Reset form
        this.classData = {
          Class: '',
          Division: '',
          AcademicYear: ''
        };
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
