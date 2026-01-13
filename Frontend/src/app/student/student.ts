import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Studentsidebar } from "../studentsidebar/studentsidebar";

@Component({
  selector: 'app-student',
  imports: [RouterLink, Studentsidebar],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class Student {

}
