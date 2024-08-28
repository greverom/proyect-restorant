import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../../models/alimento';
import { AlimentosService } from '../../../services/alimentos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rollos-de-canela',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './rollos-de-canela.component.html',
  styleUrl: './rollos-de-canela.component.css'
})
export class RollosDeCanelaComponent implements OnInit  {
  alimentos: Alimento[] = [];

  constructor(private alimentosService: AlimentosService) {}

  ngOnInit(): void {
      this.cargarAlimentos();
  }

  cargarAlimentos() {

      this.alimentosService.obtenerAlimentos('Rollos de canela').subscribe((data: Alimento[]) => {
        this.alimentos = data; // Almacenar los alimentos en la variable alimentos si es necesario
      });
    
  }
}
