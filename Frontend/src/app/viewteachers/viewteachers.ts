import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewteachers',
  imports: [Adminsidebar, CommonModule],
  templateUrl: './viewteachers.html',
  styleUrl: './viewteachers.scss',
})
export class Viewteachers implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  teachers: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.loading = true;
    this.cdr.markForCheck();
    this.adminService.getTeachers().subscribe({
      next: (data) => {
        console.log('Teachers loaded:', data);
        this.teachers = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.error = 'Failed to load teachers';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
