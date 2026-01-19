import { Component, inject, OnInit } from '@angular/core';
import { Studentsidebar } from "../studentsidebar/studentsidebar";
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentattendance',
  imports: [Studentsidebar, CommonModule],
  templateUrl: './studentattendance.html',
  styleUrl: './studentattendance.scss',
})
export class Studentattendance implements OnInit {
  private studentService = inject(StudentService);
  attendance: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.loading = true;
    this.studentService.getMyAttendance().subscribe({
      next: (data) => {
        this.attendance = data || [];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load attendance';
        this.loading = false;
      }
    });
  }

  getMonthlyStats() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyRecords = this.attendance.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    });
    
    const present = monthlyRecords.filter(r => r.status === 'Present').length;
    const total = monthlyRecords.length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
    return { present, total, absent: total - present, percentage };
  }

  getOverallStats() {
    const total = this.attendance.length;
    const present = this.attendance.filter(a => a.status === 'Present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { total, present, absent: total - present, percentage };
  }
}