import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../models/mesas';
import { MesasService } from '../../services/mesas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule,
            FormsModule
  ],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent implements OnInit {
  mesas: Mesa[] = [];
  mesaSeleccionada: Mesa | null = null;
  capacidadSeleccionada: number | null = null;

  constructor(private mesasService: MesasService) {}

  ngOnInit() {
    this.cargarMesas();
  }

  cargarMesas() {
    this.mesasService.obtenerMesas().subscribe(mesas => {
      this.mesas = mesas;
    });
  }

  seleccionarMesa(mesaId: string) {
    this.mesaSeleccionada = this.mesas.find(m => m.id === mesaId) || null;
  }

  confirmarCapacidad() {
    if (this.mesaSeleccionada && this.capacidadSeleccionada) {
      this.mesasService.cambiarEstadoMesa(this.mesaSeleccionada.id, 'ocupada', this.capacidadSeleccionada)
        .then(() => {
          this.mesaSeleccionada = null;
          this.capacidadSeleccionada = null;
          this.cargarMesas(); 
        })
        .catch(error => console.error('Error al asignar capacidad:', error));
    }
  }
}
