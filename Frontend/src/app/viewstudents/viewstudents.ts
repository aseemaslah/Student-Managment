import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Teachersidebar } from "../teachersidebar/teachersidebar";

@Component({
  selector: 'app-viewstudents',
  imports: [ Teachersidebar],
  templateUrl: './viewstudents.html',
  styleUrl: './viewstudents.scss',
})
export class Viewstudents {

}
