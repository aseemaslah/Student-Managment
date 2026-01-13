import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";

@Component({
  selector: 'app-addteacher',
  imports: [ Adminsidebar],
  templateUrl: './addteacher.html',
  styleUrl: './addteacher.scss',
})
export class Addteacher {

}
