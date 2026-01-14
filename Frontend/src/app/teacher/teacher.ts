import { Component } from '@angular/core';
import { Teachersidebar } from "../teachersidebar/teachersidebar";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-teacher',
  imports: [Teachersidebar, RouterLink],
  templateUrl: './teacher.html',
  styleUrl: './teacher.scss',
})
export class Teacher {

}
