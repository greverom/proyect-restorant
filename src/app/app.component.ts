import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComidaManagerComponent } from "./components/comida-manager/comida-manager.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComidaManagerComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'restaurante';
}
