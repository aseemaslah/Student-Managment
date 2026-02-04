import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendancereport',
  imports: [Teachersidebar, CommonModule, FormsModule],
  templateUrl: './attendancereport.html',
  styleUrl: './attendancereport.scss',
})
export class Attendancereport implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);

  attendanceData: any[] = [];
  classSummaries: any[] = [];
  loading = true;
  viewMode: 'records' | 'summary' = 'summary';

  startDate = '';
  endDate = '';
  selectedClassIndex = 0;

  ngOnInit() {
    this.loadClassSummary();
  }

  setViewMode(mode: 'records' | 'summary') {
    this.viewMode = mode;
    if (this.viewMode === 'summary') {
      this.loadClassSummary();
    } else {
      this.loadAttendanceRecords();
    }
  }

  loadClassSummary() {
    this.loading = true;
    this.adminService.getTeacherClassSummary().subscribe({
      next: (data) => {
        this.classSummaries = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading class summary:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadAttendanceRecords() {
    this.loading = true;
    const filters: any = {};
    if (this.startDate) filters.startDate = this.startDate;
    if (this.endDate) filters.endDate = this.endDate;

    this.adminService.getTeacherAttendanceReport(filters).subscribe({
      next: (data) => {
        this.attendanceData = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading attendance records:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onViewModeChange() {
    if (this.viewMode === 'summary') {
      this.loadClassSummary();
    } else {
      this.loadAttendanceRecords();
    }
  }

  onDateFilterChange() {
    if (this.viewMode === 'records') {
      this.loadAttendanceRecords();
    }
  }

  getAttendanceColor(percentage: number): string {
    if (percentage >= 85) return 'success';
    if (percentage >= 75) return 'warning';
    return 'danger';
  }

  getAttendanceStatus(percentage: number): string {
    if (percentage >= 85) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Average';
    return 'Poor';
  }
}
