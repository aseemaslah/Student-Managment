import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { AdminService } from '../services/admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entermarks',
  imports: [Teachersidebar, FormsModule, CommonModule],
  templateUrl: './entermarks.html',
  styleUrl: './entermarks.scss',
})
export class Entermarks implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  
  students: any[] = [];
  marksData = {
    studentId: '',
    subject: '',
    examType: '',
    marks: 0,
    total: 100
  };

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.adminService.getTeacherStudents().subscribe({
      next: (data) => {
        this.students = data || [];
        this.cdr.markForCheck();
      },
      error: (error) => console.error('Error loading students:', error)
    });
  }

  onSubmit() {
    if (!this.marksData.studentId || !this.marksData.subject || !this.marksData.examType || 
        this.marksData.marks < 0 || this.marksData.total <= 0) {
      alert('Please fill all fields with valid values');
      return;
    }

    if (this.marksData.marks > this.marksData.total) {
      alert('Marks obtained cannot be greater than total marks');
      return;
    }

    this.adminService.addExamMarks(this.marksData).subscribe({
      next: (response) => {
        alert('Exam marks added successfully!');
        this.marksData = { studentId: '', subject: '', examType: '', marks: 0, total: 100 };
        this.cdr.markForCheck();
      },
      error: (error) => {
        alert('Error adding marks: ' + (error.error?.error || error.message));
      }
    });
  }
}
