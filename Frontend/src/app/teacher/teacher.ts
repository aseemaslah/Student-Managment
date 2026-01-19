import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { RouterLink } from "@angular/router";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher',
  imports: [Teachersidebar, RouterLink, CommonModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.scss',
})
export class Teacher implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  
  stats = {
    myClasses: 0,
    myStudents: 0,
    myAttendanceRecords: 0,
    myAttendancePercentage: 0
  };
  
  loading = true;

  ngOnInit() {
    this.loadTeacherStats();
  }

  loadTeacherStats() {
    this.adminService.getTeacherDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading teacher stats:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
