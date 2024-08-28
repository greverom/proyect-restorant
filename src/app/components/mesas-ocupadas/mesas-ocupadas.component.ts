import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../models/mesas';
import { MesasService } from '../../services/mesas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesas-ocupadas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesas-ocupadas.component.html',
  styleUrl: './mesas-ocupadas.component.css'
})


export class MesasOcupadasComponent implements OnInit {
  mesasOcupadas: Mesa[] = [];

  constructor(private mesasService: MesasService) {}

  ngOnInit() {
    this.cargarMesasOcupadas();
  }

  cargarMesasOcupadas() {
    this.mesasService.obtenerMesas().subscribe(mesas => {
      this.mesasOcupadas = mesas.filter(mesa => mesa.estado === 'ocupada');
    });
  }
  pagarPedido(mesaId: string) {

  }

  desocuparMesa(mesaId: string) {
    this.mesasService.cambiarEstadoMesa(mesaId, 'disponible', 0, '')
      .then(() => {
        this.cargarMesasOcupadas(); 
      })
      .catch(error => console.error('Error al desocupar la mesa:', error));
  }


  marcarMesaComoPagada(mesaId: string) {

  }
}
