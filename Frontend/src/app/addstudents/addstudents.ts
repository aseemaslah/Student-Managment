import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addstudents',
  imports: [Teachersidebar, FormsModule, CommonModule],
  templateUrl: './addstudents.html',
  styleUrl: './addstudents.scss',
})
export class Addstudents implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  classes: any[] = [];

  studentData = {
    username: '',
    name: '',
    password: '',
    rollNo: '',
    classId: ''
  };

  ngOnInit() {
    console.log('=== ADD STUDENTS COMPONENT INIT ===');
    console.log('Token in localStorage:', localStorage.getItem('token'));
    console.log('Current user:', localStorage.getItem('currentUser'));
    this.loadClasses();
  }

  loadClasses() {
    console.log('Loading teacher classes...');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found - user not logged in');
      alert('Please login first');
      return;
    }

    this.adminService.getTeacherClasses().subscribe({
      next: (data) => {
        console.log('Teacher classes loaded:', data);
        this.classes = data || [];
        if (this.classes.length === 0) {
          console.log('No classes assigned to this teacher');
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading teacher classes:', error);
        console.log('Using fallback to all classes for testing');
        // Fallback to all classes for testing
        this.adminService.getClasses().subscribe({
          next: (data) => {
            console.log('Fallback - all classes loaded:', data);
            this.classes = data || [];
            this.cdr.markForCheck();
          },
          error: (fallbackError) => console.error('Fallback error:', fallbackError)
        });
      }
    });
  }

  onSubmit() {
    console.log('=== SUBMITTING STUDENT DATA ===');
    console.log('Student data:', JSON.stringify(this.studentData, null, 2));

    if (!this.studentData.username || !this.studentData.password || !this.studentData.rollNo || !this.studentData.classId) {
      alert('Please fill all required fields');
      return;
    }

    this.adminService.createStudent(this.studentData).subscribe({
      next: (response) => {
        console.log('Student creation response:', response);
        alert('Student added successfully!');
        this.studentData = { username: '', name: '', password: '', rollNo: '', classId: '' };
        this.cdr.markForCheck();
        this.router.navigate(['/teacherviewstudents']);
      },
      error: (error) => {
        console.error('=== STUDENT CREATION ERROR ===');
        console.error('Full error object:', error);

        let errorMessage = 'Error adding student';
        if (error.error && error.error.error) {
          errorMessage = error.error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }

        alert(errorMessage);
      }
    });
  }
}
