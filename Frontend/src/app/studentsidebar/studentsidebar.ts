import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-studentsidebar',
  imports: [RouterLink],
  templateUrl: './studentsidebar.html',
  styleUrl: './studentsidebar.scss',
})
export class Studentsidebar {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/main']);
  }
}
