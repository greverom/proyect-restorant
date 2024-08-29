import { Component, Input, OnInit } from '@angular/core';
import { Alimento } from '../../../models/alimento';
import { AlimentosService } from '../../../services/alimentos.service';
import { CommonModule } from '@angular/common';
import { MesasService } from '../../../services/mesas.service';
import { ProductoPedido } from '../../../models/mesas';
import { ActivatedRoute } from '@angular/router';

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
  @Input() mesaId!: string;
  
  constructor(private alimentosService: AlimentosService,
              private mesasService: MesasService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.mesaId = params.get('mesaId')!;
      console.log('ID de la mesa seleccionada:', this.mesaId);
    });
  
    this.cargarAlimentos();
  }

  cargarAlimentos() {
      this.alimentosService.obtenerAlimentos('Rollos de canela').subscribe((data: Alimento[]) => {
        this.alimentos = data; // Almacenar los alimentos en la variable alimentos si es necesario
      });
  }

  agregarProducto(alimento: Alimento) {
    if (alimento.id && this.mesaId) {
      const productoPedido: ProductoPedido = {
        id: alimento.id,
        nombre: alimento.nombre,
        precio: alimento.precio,
        cantidad: 1
      };
      
      this.mesasService.agregarProductoAlPedido(this.mesaId, productoPedido)
        .then(() => {
          console.log('Producto agregado correctamente');
        })
        .catch(error => {
          console.error('Error al agregar el producto:', error);
        });
    } else {
      console.error('No se pudo agregar el producto: ID de alimento o ID de mesa no definido');
    }
  }

  
}
