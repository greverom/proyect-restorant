import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../models/mesas';
import { MesasService } from '../../services/mesas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  empleadoAsignado: string = '';

  constructor(private mesasService: MesasService,
              private router: Router) {}

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

  confirmarAsignacion() {
    if (this.mesaSeleccionada && this.capacidadSeleccionada) {
      this.mesasService.cambiarEstadoMesa(this.mesaSeleccionada.id, 'ocupada', this.capacidadSeleccionada, this.empleadoAsignado)
        .then(() => {
          this.mesaSeleccionada = null;
          this.capacidadSeleccionada = null;
          this.empleadoAsignado = '';
          this.cargarMesas(); 
          this.router.navigate(['/mesas-ocupadas']);  // Redirigir a mesas-ocupadas después de la asignación
        })
        .catch(error => console.error('Error al asignar la mesa:', error));
    }
  }

  cancelarAsignacion() {
    this.mesaSeleccionada = null;  // Desselecciona la mesa
    this.capacidadSeleccionada = null;  // Resetea la capacidad seleccionada
    this.empleadoAsignado = '';  // Resetea el nombre del empleado
  }
}
