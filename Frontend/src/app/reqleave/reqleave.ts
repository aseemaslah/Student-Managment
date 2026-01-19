import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Studentsidebar } from "../studentsidebar/studentsidebar";
import { StudentService } from '../services/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reqleave',
  imports: [Studentsidebar, FormsModule, CommonModule],
  templateUrl: './reqleave.html',
  styleUrl: './reqleave.scss',
})
export class Reqleave {
  private studentService = inject(StudentService);
  private cdr = inject(ChangeDetectorRef);
  
  leaveData = {
    startDate: '',
    endDate: '',
    reason: ''
  };

  onSubmit() {
    this.studentService.submitLeave(this.leaveData).subscribe({
      next: (response) => {
        alert('Leave request submitted successfully!');
        this.leaveData = { startDate: '', endDate: '', reason: '' };
        this.cdr.markForCheck();
      },
      error: (error) => {
        alert('Error submitting leave request: ' + (error.error?.error || error.message));
      }
    });
  }
}
