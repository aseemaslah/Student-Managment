import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from '../footer/footer';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-main',
  imports: [ Footer, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
