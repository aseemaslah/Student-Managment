import { Component, inject, OnInit, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { AdminService } from '../services/admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-markattendance',
  imports: [Teachersidebar, FormsModule, CommonModule],
  templateUrl: './markattendance.html',
  styleUrl: './markattendance.scss',
})
export class Markattendance implements OnInit {

  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  students: any[] = [];

  selectedMonth: string = this.getCurrentMonth();
  monthDates: string[] = [];

  attendance: Record<string, Record<string, boolean>> = {};

  loading = false;

  getCurrentMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStudents();
    }
  }

  loadStudents() {
    this.loading = true;
    this.adminService.getTeacherStudents().subscribe({
      next: (data) => {
        this.students = data || [];
        this.loading = false;
        if (this.selectedMonth) {
          this.generateDates();
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  generateDates() {
    if (!this.selectedMonth || this.students.length === 0) return;

    this.monthDates = [];
    this.attendance = {};

    const [year, month] = this.selectedMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month - 1, day);
      const yearStr = dateObj.getFullYear();
      const monthStr = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dayStr = String(dateObj.getDate()).padStart(2, '0');
      const date = `${yearStr}-${monthStr}-${dayStr}`;

      this.monthDates.push(date);
    }

    this.students.forEach(student => {
      this.attendance[student._id] = {};
      this.monthDates.forEach(date => {
        this.attendance[student._id][date] = false;
      });
    });

    this.loadExistingAttendance();

    this.cdr.detectChanges();
  }

  loadExistingAttendance() {
    if (!this.selectedMonth) return;

    const [year, month] = this.selectedMonth.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    this.adminService.getTeacherAttendanceReport({ startDate, endDate }).subscribe({
      next: (attendanceRecords) => {
        attendanceRecords.forEach((record: any) => {
          const studentId = record.studentId?._id || record.studentId;
          const recordDate = new Date(record.date).toISOString().split('T')[0];

          if (this.attendance[studentId] && this.attendance[studentId][recordDate] !== undefined) {
            this.attendance[studentId][recordDate] = record.status === 'Present';
          }
        });
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading existing attendance:', error);
      }
    });
  }


  saveAttendance() {
    if (!this.selectedMonth || this.monthDates.length === 0) {
      alert('Please select a month first');
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();

    const attendanceRecords: any[] = [];

    for (const studentId in this.attendance) {
      for (const date in this.attendance[studentId]) {
        attendanceRecords.push({
          studentId,
          date,
          status: this.attendance[studentId][date] ? 'Present' : 'Absent'
        });
      }
    }

    console.log('Saving attendance:', attendanceRecords);

    this.adminService.bulkMarkAttendance(attendanceRecords).subscribe({
      next: () => {
        alert('Attendance saved successfully!');
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Attendance save error:', error);
        alert(error.error?.error || 'Error saving attendance');
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
