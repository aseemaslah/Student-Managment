import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';
import { Teachersidebar } from "../teachersidebar/teachersidebar";

@Component({
  selector: 'app-viewstudents',
  imports: [Teachersidebar, CommonModule],
  templateUrl: './viewstudents.html',
  styleUrl: './viewstudents.scss',
})
export class Viewstudents implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  classGroups: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.cdr.markForCheck();
    this.adminService.getTeacherStudents().subscribe({
      next: (data) => {
        console.log('Students loaded:', data);
        this.classGroups = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.error = 'Failed to load students';
        this.loading = false;
        this.cdr.markForCheck();
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

  onDeleteStudent(studentId: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.adminService.deleteStudent(studentId).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student');
        }
      });
    }
  }
}
