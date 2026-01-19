import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Studentsidebar } from "../studentsidebar/studentsidebar";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  imports: [RouterLink, Studentsidebar, CommonModule],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class Student implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  
  stats = {
    myClass: null as any,
    classmates: 0,
    myTotalDays: 0,
    myPresentDays: 0,
    myAttendancePercentage: 0
  };
  
  loading = true;

  ngOnInit() {
    this.loadStudentStats();
  }

  loadStudentStats() {
    this.adminService.getStudentDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading student stats:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
