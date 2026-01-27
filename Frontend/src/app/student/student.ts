import { Component, inject, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Studentsidebar } from '../studentsidebar/studentsidebar';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  imports: [RouterLink, Studentsidebar, CommonModule],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class Student implements OnInit, AfterViewInit {
  private studentService = inject(StudentService);
  private cdr =inject(ChangeDetectorRef)
  
  stats = {
    myClass: null as any,
    classmates: 0,
    myTotalDays: 0,
    myPresentDays: 0,
    myAttendancePercentage: 0
  };
  
  loading = false;

  ngOnInit() {
    this.loadStudentStats();
  }

  ngAfterViewInit() {
    // Fallback load after view init
    setTimeout(() => {
      if (this.loading) {
        this.loadStudentStats();
      }
    }, 1000);
  }

  // loadStudentStats() {
  //   this.loading = true;
  //   this.studentService.getDashboardStats().subscribe({
  //     next: (data) => {
  //       if (data) {
  //         this.stats = data;
  //       }
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error loading student stats:', error);
  //       this.loading = false;
  //       // Show default data instead of staying in loading state
  //       this.stats = {
  //         myClass: { Class: 'No Class', Division: '' },
  //         classmates: 0,
  //         myTotalDays: 0,
  //         myPresentDays: 0,
  //         myAttendancePercentage: 0
  //       };
  //     }
  //   });
  // }
   loadStudentStats() {
    this.studentService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}