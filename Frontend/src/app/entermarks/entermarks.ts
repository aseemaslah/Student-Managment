import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Teacher } from "../teacher/teacher";
import { Teachersidebar } from "../teachersidebar/teachersidebar";

@Component({
  selector: 'app-entermarks',
  imports: [ Teachersidebar],
  templateUrl: './entermarks.html',
  styleUrl: './entermarks.scss',
})
export class Entermarks {

}
