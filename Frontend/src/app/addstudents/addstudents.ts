import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Teachersidebar } from "../teachersidebar/teachersidebar";

@Component({
  selector: 'app-addstudents',
  imports: [ Teachersidebar],
  templateUrl: './addstudents.html',
  styleUrl: './addstudents.scss',
})
export class Addstudents {

}
