import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
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
}
