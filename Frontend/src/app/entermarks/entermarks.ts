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
    this.adminService.addExamMarks(this.marksData).subscribe({
      next: (response) => {
        alert('Exam marks added successfully!');
        this.marksData = { studentId: '', subject: '', examType: '', marks: 0, total: 100 };
        this.cdr.markForCheck();
      },
      error: (error) => {
        alert('Error adding marks: ' + error.message);
      }
    });
  }
}
