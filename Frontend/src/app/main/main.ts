import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-main',
  imports: [Navbar,Footer],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
