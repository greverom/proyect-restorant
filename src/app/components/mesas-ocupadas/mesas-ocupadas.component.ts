import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../models/mesas';
import { MesasService } from '../../services/mesas.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RollosDeCanelaComponent } from '../menu/rollos-de-canela/rollos-de-canela.component';

@Component({
  selector: 'app-mesas-ocupadas',
  standalone: true,
  imports: [CommonModule,
             FormsModule,
             RollosDeCanelaComponent
  ],
  templateUrl: './mesas-ocupadas.component.html',
  styleUrl: './mesas-ocupadas.component.css'
})


export class MesasOcupadasComponent implements OnInit {
  mesasOcupadas: Mesa[] = [];

  constructor(private mesasService: MesasService,
              private router: Router,  // Agregar Router para redireccionar a otros componentes.
  ) {}

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
        this.router.navigate(['/mesas']); 
      })
      .catch(error => console.error('Error al desocupar la mesa:', error));
  }

  marcarMesaComoPagada(mesaId: string) {

  }

  navigateToMenu(mesaId: string) {
    this.router.navigate(['/menu-restorant'], { queryParams: { mesaId: mesaId } });
  }
}
