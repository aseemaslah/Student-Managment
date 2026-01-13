import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Studentsidebar } from "../studentsidebar/studentsidebar";
import { Teachersidebar } from "../teachersidebar/teachersidebar";

@Component({
  selector: 'app-viewleave',
  imports: [ Teachersidebar],
  templateUrl: './viewleave.html',
  styleUrl: './viewleave.scss',
})
export class Viewleave {

}
