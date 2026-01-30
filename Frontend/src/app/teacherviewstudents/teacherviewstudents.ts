import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacherviewstudents',
  imports: [Teachersidebar, CommonModule],
  templateUrl: './teacherviewstudents.html',
  styleUrl: './teacherviewstudents.scss',
})
export class Teacherviewstudents implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  students: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    console.log('=== LOADING TEACHER STUDENTS ===');
    console.log('Token in localStorage:', localStorage.getItem('token'));
    
    this.loading = true;
    this.cdr.markForCheck();
    this.adminService.getTeacherStudents().subscribe({
      next: (data) => {
        console.log('Teacher students loaded:', data);
        this.students = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading teacher students:', error);
        console.log('Status:', error.status);
        if (error.status === 401) {
          alert('Please login again - session expired');
        }
        this.error = 'Failed to load students';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
  onDeleteStudent(studentId: string) {
    this.adminService.deleteStudent(studentId).subscribe({
      next: () => {
        console.log('Student deleted:', studentId);
        this.students = this.students.filter(s => s._id !== studentId);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }
onEditStudent(student: any) {
    const currentUsername = student.userId?.username;
    const newUsername = prompt('Enter new username:', currentUsername);
    if (newUsername && newUsername !== currentUsername) {
      this.adminService.updateStudent(student._id, { username: newUsername }).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error updating student:', error);
          alert('Failed to update student');
        }
      });
    }
  }

}