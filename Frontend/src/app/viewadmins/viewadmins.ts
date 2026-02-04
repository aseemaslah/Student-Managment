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

import { Adminsidebar } from '../adminsidebar/adminsidebar';
import { AdminService } from '../services/admin-service';

declare var bootstrap: any;

@Component({
  selector: 'app-viewadmins',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Adminsidebar
  ],
  templateUrl: './viewadmins.html',
  styleUrl: './viewadmins.scss',
})
export class Viewadmins implements OnInit {

  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  admins: any[] = [];
  loading = true;
  saving = false;

  editAdminForm!: FormGroup;
  selectedAdminId = '';

  ngOnInit() {
    this.initForm();
    this.loadAdmins();
  }

  /* ================= FORM ================= */
  initForm() {
    this.editAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['']
    });
  }

  /* ================= LOAD ADMINS ================= */
  loadAdmins() {
    this.loading = true;
    this.cdr.markForCheck();

    this.adminService.getAdmins().subscribe({
      next: (data: any) => {
        this.admins = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load admins', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /* ================= OPEN MODAL ================= */
  openEditModal(admin: any) {
    this.selectedAdminId = admin._id;

    this.editAdminForm.patchValue({
      username: admin.username,
      password: ''
    });

    const modal = new bootstrap.Modal(
      document.getElementById('editAdminModal')
    );
    modal.show();
  }

  /* ================= UPDATE ADMIN ================= */
  updateAdmin() {
    if (this.editAdminForm.invalid) return;

    this.saving = true;

    const payload: any = {
      username: this.editAdminForm.value.username
    };

    if (this.editAdminForm.value.password) {
      payload.password = this.editAdminForm.value.password;
    }

    this.adminService.updateAdmin(this.selectedAdminId, payload).subscribe({
      next: () => {
        this.saving = false;
        this.loadAdmins();

        const modalEl = document.getElementById('editAdminModal');
        bootstrap.Modal.getInstance(modalEl)?.hide();
      },
      error: (err) => {
        console.error('Update failed', err);
        this.saving = false;
      }
    });
  }

  /* ================= DELETE ADMIN ================= */
  deleteAdmin(id: string) {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.admins = this.admins.filter(a => a._id !== id);
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }
}
