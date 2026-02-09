import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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

  // students list
  students: any[] = [];

  // dropdown values
  examType: string = '';
  selectedSubject: string = '';
  totalMarks: number = 100;

  // subjects list
  subjects: string[] = [
    'English',
    'Mathematics',
    'Science',
    'Social Science',
    'Hindi',
    'Computer Science'
  ];

  // marks[studentId] = obtained marks
  marks: Record<string, number> = {};

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.adminService.getTeacherStudents().subscribe({
      next: (data) => {
        this.students = data || [];

        // initialize marks for each student
        this.students.forEach(student => {
          this.marks[student._id] = 0;
        });

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  saveMarks() {

    // validations
    if (!this.examType || !this.selectedSubject) {
      alert('Please select exam type and subject');
      return;
    }

    if (this.totalMarks <= 0) {
      alert('Total marks must be greater than zero');
      return;
    }

    const payload: any[] = [];

    for (const studentId in this.marks) {
      const obtainedMarks = this.marks[studentId];

      if (obtainedMarks < 0 || obtainedMarks > this.totalMarks) {
        alert('Marks obtained must be between 0 and total marks');
        return;
      }

      payload.push({
        studentId,
        subject: this.selectedSubject,
        examType: this.examType,
        marks: obtainedMarks,
        total: this.totalMarks
      });
    }

    console.log('Saving marks payload:', payload);

    this.adminService.bulkAddMarks(payload).subscribe({
      next: () => {
        alert('Marks saved successfully!');
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error(error);
        alert(error.error?.error || 'Error saving marks');
      }
    });

  }
}
