import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Studentsidebar } from "../studentsidebar/studentsidebar";
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewattendance',
  imports: [Studentsidebar, CommonModule],
  templateUrl: './viewattendance.html',
  styleUrl: './viewattendance.scss',
})
export class Viewattendance implements OnInit {
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

  getAttendanceStats() {
    const total = this.attendance.length;
    const present = this.attendance.filter(a => a.status === 'Present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    return { total, present, absent: total - present, percentage };
  }
}
