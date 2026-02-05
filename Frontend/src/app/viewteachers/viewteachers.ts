import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Adminsidebar } from '../adminsidebar/adminsidebar';
import { AdminService } from '../services/admin-service';
import { Teacher } from '../teacher/teacher';

declare var bootstrap: any;

@Component({
  selector: 'app-viewteachers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Adminsidebar
  ],
  templateUrl: './viewteachers.html',
  styleUrl: './viewteachers.scss',
})
export class Viewteachers implements OnInit {

  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  teachers: any[] = [];
  classes: any[] = [];

  loading = true;
  saving = false;

  editTeacherForm!: FormGroup;
  selectedTeacherId = '';

  ngOnInit() {
    this.initForm();
    this.loadTeachers();
    this.loadClasses();
  }

  initForm() {
    this.editTeacherForm = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      assignedClass: [null]
    });
  }

  loadTeachers() {
    this.loading = true;
    this.cdr.markForCheck();

    this.adminService.getTeachers().subscribe({
      next: (data: any) => {
        this.teachers = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load teachers', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadClasses() {
    this.adminService.getClasses().subscribe({
      next: (data: any) => {
        this.classes = data || [];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load classes', err);
      }
    });
  }

  openEditModal(teacher: any) {
    this.selectedTeacherId = teacher._id;

    this.editTeacherForm.patchValue({
      username: teacher.userId?.username || teacher.username,
      password: '',
      assignedClass: teacher.assignedClass?._id || null
    });

    const modal = new bootstrap.Modal(
      document.getElementById('editTeacherModal')
    );
    modal.show();
  }
  updateTeacher() {
    if (this.editTeacherForm.invalid) return;

    this.saving = true;

    const payload: any = {
      username: this.editTeacherForm.value.username,
      classId: this.editTeacherForm.value.assignedClass
    };

    if (this.editTeacherForm.value.password) {
      payload.password = this.editTeacherForm.value.password;
    }

    this.adminService.updateTeacher(this.selectedTeacherId, payload).subscribe({
      next: () => {
        this.saving = false;
        this.loadTeachers();

        const modalEl = document.getElementById('editTeacherModal');
        bootstrap.Modal.getInstance(modalEl)?.hide();
      },
      error: (err) => {
        console.error('Update failed', err);
        this.saving = false;
      }
    });
  }

  deleteTeacher(id: string) {
    this.adminService.deleteTeacher(id).subscribe({
      next: () => {
        this.teachers = this.teachers.filter(t => t._id !== id);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }





}
