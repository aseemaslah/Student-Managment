import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignteacher',
  imports: [Adminsidebar, FormsModule, CommonModule],
  templateUrl: './assignteacher.html',
  styleUrl: './assignteacher.scss',
})
export class Assignteacher implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  teachers: any[] = [];
  classes: any[] = [];
  loadingTeachers = true;
  loadingClasses = true;

  assignmentData = {
    teacherId: '',
    classId: '',
    subjects: [] as string[]
  };

  availableSubjects = ['Mathematics', 'Science', 'History', 'English', 'Hindi', 'Malayalam', 'Computer'];
  selectedSubject = '';

  ngOnInit() {
    console.log('Loading teachers and classes...');
    this.loadTeachers();
    this.loadClasses();
  }

  loadTeachers() {
    this.loadingTeachers = true;
    this.cdr.markForCheck();
    this.adminService.getTeachers().subscribe({
      next: (data) => {
        console.log('Teachers loaded:', data);
        this.teachers = data || [];
        this.loadingTeachers = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.loadingTeachers = false;
        this.cdr.markForCheck();
        alert('Failed to load teachers');
      }
    });
  }

  loadClasses() {
    this.loadingClasses = true;
    this.cdr.markForCheck();
    this.adminService.getClasses().subscribe({
      next: (data) => {
        console.log('Classes loaded:', data);
        this.classes = data || [];
        this.loadingClasses = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading classes:', error);
        this.loadingClasses = false;
        this.cdr.markForCheck();
        alert('Failed to load classes');
      }
    });
  }

  // addSubject() {
  //   if (this.selectedSubject && !this.assignmentData.subjects.includes(this.selectedSubject)) {
  //     this.assignmentData.subjects.push(this.selectedSubject);
  //     this.selectedSubject = '';
  //   }
  // }

  // removeSubject(index: number) {
  //   this.assignmentData.subjects.splice(index, 1);
  // }

  onSubmit() {
    this.adminService.assignTeacher(this.assignmentData).subscribe({
      next: (response) => {
        alert('Teacher assigned successfully!');
        this.assignmentData = { teacherId: '', classId: '', subjects: [] };
        this.cdr.markForCheck();
        this.router.navigate(['/viewteachers']);
      },
      error: (error) => {
        alert('Error assigning teacher: ' + error.message);
      }
    });
  }
}
