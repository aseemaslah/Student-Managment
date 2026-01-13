import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Adminsidebar } from "../adminsidebar/adminsidebar";

@Component({
  selector: 'app-admin',
  imports: [RouterLink, Adminsidebar],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

}
