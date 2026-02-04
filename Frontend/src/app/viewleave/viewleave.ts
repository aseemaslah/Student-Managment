import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-viewleave',
  standalone: true,
  imports: [CommonModule, Teachersidebar],
  templateUrl: './viewleave.html',
  styleUrl: './viewleave.scss',
})
export class Viewleave implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef)

  leaves: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves() {
    this.loading = true;
    this.adminService.getStudentLeaves().subscribe({
      next: (data) => {
        this.leaves = data;
        this.loading = false;
        console.log('Leaves loaded:', this.leaves);
        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error('Failed to load leaves', err);
        this.loading = false;
      }
    });
  }

  updateStatus(leaveId: string, status: string) {
    if (confirm(`Are you sure you want to ${status.toLowerCase()} this leave request?`)) {
      this.adminService.updateLeaveStatus(leaveId, status).subscribe({
        next: () => {
          this.loadLeaves();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to update leave status', err);
        }
      });
    }
  }
}
