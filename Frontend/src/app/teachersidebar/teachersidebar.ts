import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-teachersidebar',
  imports: [RouterLink],
  templateUrl: './teachersidebar.html',
  styleUrl: './teachersidebar.scss',
})
export class Teachersidebar {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/main']);
  }
}
