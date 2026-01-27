import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Studentsidebar } from "../studentsidebar/studentsidebar";
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewattendance',
  imports: [Studentsidebar, CommonModule],
  templateUrl: './viewattendance.html',
  styleUrl: './viewattendance.scss',
})
export class Viewattendance implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef)
  
  attendanceRecords: any[] = [];

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.adminService.getStudentAttendance().subscribe({
      next: (data) => {
        this.attendanceRecords = data || [];
        this.cdr.markForCheck();
      },
      error: (error) => console.error('Error loading attendance:', error)
    });
  }
  
}