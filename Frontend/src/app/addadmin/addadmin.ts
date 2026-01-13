import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Adminsidebar } from "../adminsidebar/adminsidebar";

@Component({
  selector: 'app-addadmin',
  imports: [ Adminsidebar],
  templateUrl: './addadmin.html',
  styleUrl: './addadmin.scss',
})
export class Addadmin {

}
