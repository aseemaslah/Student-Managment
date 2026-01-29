import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-adminsidebar',
  imports: [RouterLink],
  templateUrl: './adminsidebar.html',
  styleUrl: './adminsidebar.scss',
})
export class Adminsidebar {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/main']);
  }
}
