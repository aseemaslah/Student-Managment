import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Teachersidebar } from "../teachersidebar/teachersidebar";

@Component({
  selector: 'app-attendancereport',
  imports: [ Teachersidebar],
  templateUrl: './attendancereport.html',
  styleUrl: './attendancereport.scss',
})
export class Attendancereport {

}
