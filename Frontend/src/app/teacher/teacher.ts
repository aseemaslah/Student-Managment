import { Component, inject, OnInit, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { RouterLink } from "@angular/router";
import { AdminService } from '../services/admin-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-teacher',
  imports: [Teachersidebar, RouterLink, CommonModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.scss',
})
export class Teacher implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  myClasses: any[] = [];
  totalStudents = 0;

  ngOnInit() {
    // Only load data in browser context (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.loadDashboardStats();
    }
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
