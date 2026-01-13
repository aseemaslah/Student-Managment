import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Studentsidebar } from "../studentsidebar/studentsidebar";

@Component({
  selector: 'app-reqleave',
  imports: [ Studentsidebar],
  templateUrl: './reqleave.html',
  styleUrl: './reqleave.scss',
})
export class Reqleave {

}
