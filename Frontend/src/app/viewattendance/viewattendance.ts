import { Component, inject, OnInit } from '@angular/core';
import { Studentsidebar } from '../studentsidebar/studentsidebar';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewattendance',
  standalone: true,
  imports: [Studentsidebar, CommonModule],
  templateUrl: './viewattendance.html',
  styleUrl: './viewattendance.scss',
})
export class Viewattendance implements OnInit {
  private studentService = inject(StudentService);
  
  attendance: any[] = [];
  loading = true;

  // Stats
  percentage: string | number = 0;
  present = 0;
  absent = 0;

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.loading = true;
    this.studentService.getMyAttendance().subscribe({
      next: (data) => {
        this.attendance = data || [];
        this.calculateStats();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading attendance:', error);
        this.loading = false;
      }
    });
  }

  calculateStats() {
    const total = this.attendance.length;
    this.present = this.attendance.filter(a => a.status === 'Present').length;
    this.absent = total - this.present;
    this.percentage = total > 0 ? ((this.present / total) * 100).toFixed(1) : 0;
  }
}