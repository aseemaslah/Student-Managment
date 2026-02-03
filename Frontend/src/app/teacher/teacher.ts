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
  
myClasses: any[] = [];
totalStudents = 0;

ngOnInit() {
  this.loadDashboardStats();
}

loadDashboardStats() {
  this.adminService.getTeacherDashboardStats().subscribe({
    next: (res) => {
      console.log(res); // 🔍 always log once

      this.myClasses = res.myClasses || [];
      this.totalStudents = res.totalStudents || 0;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('Failed to load dashboard stats', err);
    }
  });
}

}
