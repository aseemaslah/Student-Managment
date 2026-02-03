import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Teachersidebar } from '../teachersidebar/teachersidebar';
import { AdminService } from '../services/admin-service';

declare var bootstrap: any;

@Component({
  selector: 'app-teacherviewstudents',
  standalone: true,
  imports: [
    Teachersidebar,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './teacherviewstudents.html',
  styleUrl: './teacherviewstudents.scss',
})
export class Teacherviewstudents implements OnInit {

  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  students: any[] = [];
  loading = true;
  error = '';

  editForm!: FormGroup;
  selectedStudentId = '';
  editModal: any;

  ngOnInit() {
    this.initForm();
    this.loadStudents();
  }

  /* ================= FORM ================= */
  initForm() {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: [''] // optional
    });
  }

  /* ================= LOAD STUDENTS ================= */
  loadStudents() {
    this.loading = true;
    this.cdr.markForCheck();

    this.adminService.getTeacherStudents().subscribe({
      next: (data: any[]) => {
        this.students = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error(error);
        this.error = 'Failed to load students';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /* ================= DELETE ================= */
  onDeleteStudent(studentId: string) {
    this.adminService.deleteStudent(studentId).subscribe({
      next: () => {
        this.students = this.students.filter(s => s._id !== studentId);
        this.cdr.markForCheck();
      },
      error: (error) => console.error(error)
    });
  }

  /* ================= OPEN EDIT MODAL ================= */
  onEditStudent(student: any) {
    this.selectedStudentId = student._id;

    this.editForm.patchValue({
      username: student.userId?.username || '',
      password: ''
    });

    const modalEl = document.getElementById('editStudentModal');
    this.editModal = new bootstrap.Modal(modalEl);
    this.editModal.show();
  }

  /* ================= UPDATE STUDENT ================= */
  updateStudent() {
    if (this.editForm.invalid) return;

    const payload: any = {
      username: this.editForm.value.username.toLowerCase().trim()
    };

    // 🔐 update password ONLY if entered
    if (this.editForm.value.password) {
      payload.password = this.editForm.value.password;
    }

    this.adminService.updateStudent(this.selectedStudentId, payload).subscribe({
      next: () => {
        this.editModal.hide();
        this.loadStudents();
      },
      error: (error) => {
        console.error('Error updating student:', error);
      }
    });
  }
}
