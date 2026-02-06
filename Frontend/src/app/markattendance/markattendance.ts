import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { AdminService } from '../services/admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-markattendance',
  imports: [Teachersidebar, FormsModule, CommonModule],
  templateUrl: './markattendance.html',
  styleUrl: './markattendance.scss',
})
export class Markattendance implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);

  students: any[] = [];
  attendanceData = {
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  };

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.adminService.getTeacherStudents().subscribe({
      next: (data) => {
        this.students = data || [];
        this.cdr.markForCheck();
      },
      error: (error) => console.error('Error loading students:', error)
    });
  }

  loading = false;

  onSubmit() {
    console.log('Submitting attendance data:', this.attendanceData);

    if (!this.attendanceData.studentId || !this.attendanceData.date) {
      alert('Please select a student and date');
      return;
    }

    this.loading = true;
    this.adminService.markAttendance(this.attendanceData).subscribe({
      next: (response) => {
        console.log('Attendance response:', response);
        alert('Attendance marked successfully!');
        this.attendanceData.studentId = '';
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Full attendance error:', error);
        const errorMessage = error.error?.error || error.message || 'Error marking attendance';
        alert(errorMessage);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
