import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Studentsidebar } from "../studentsidebar/studentsidebar";

@Component({
  selector: 'app-viewattendance',
  imports: [ Studentsidebar],
  templateUrl: './viewattendance.html',
  styleUrl: './viewattendance.scss',
})
export class Viewattendance {

}
