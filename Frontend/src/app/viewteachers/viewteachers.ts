import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";

@Component({
  selector: 'app-viewteachers',
  imports: [ Adminsidebar],
  templateUrl: './viewteachers.html',
  styleUrl: './viewteachers.scss',
})
export class Viewteachers {

}
