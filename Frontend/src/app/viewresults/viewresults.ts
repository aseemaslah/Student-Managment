import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Studentsidebar } from "../studentsidebar/studentsidebar";
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewresults',
  imports: [Studentsidebar, CommonModule],
  templateUrl: './viewresults.html',
  styleUrl: './viewresults.scss',
})
export class Viewresults implements OnInit {
  private studentService = inject(StudentService);
  private cdr = inject(ChangeDetectorRef);
  
  examData: any[] = [];
  loading = true;

  ngOnInit() {
    this.loadMyMarks();
  }

  loadMyMarks() {
    this.studentService.getMyMarks().subscribe({
      next: (data) => {
        this.examData = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading marks:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  calculatePercentage(marks: number, total: number): number {
    return total > 0 ? Math.round((marks / total) * 100) : 0;
  }

  getGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  }

  getAveragePercentage(): number {
    if (this.examData.length === 0) return 0;
    const total = this.examData.reduce((sum, exam) => sum + this.calculatePercentage(exam.marks, exam.total), 0);
    return Math.round(total / this.examData.length);
  }
}
