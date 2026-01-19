import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewstudents',
  imports: [Adminsidebar, CommonModule],
  templateUrl: './viewstudents.html',
  styleUrl: './viewstudents.scss',
})
export class Viewstudents implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  classGroups: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.cdr.markForCheck();
    this.adminService.getStudents().subscribe({
      next: (data) => {
        console.log('Students loaded:', data);
        this.classGroups = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.error = 'Failed to load students';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
