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
  productosSeleccionados: { [mesaId: string]: Set<number> } = {};
  mesaMostrandoOpcionesPago: string | null = null;

  constructor(private mesasService: MesasService,
              private router: Router
  ) {}

  ngOnInit() {
    this.cargarMesasOcupadas();
  }

  cargarMesasOcupadas() {
    this.mesasService.obtenerMesas().subscribe(mesas => {
      this.mesasOcupadas = mesas.filter(mesa => mesa.estado === 'ocupada');
      this.mesasOcupadas.forEach(mesa => {
        if (!this.productosSeleccionados[mesa.id]) {
          this.productosSeleccionados[mesa.id] = new Set<number>();
        }
      });
    });
  }

  seleccionarProducto(mesaId: string, productoIndex: number) {
    if (!this.productosSeleccionados[mesaId]) {
      this.productosSeleccionados[mesaId] = new Set<number>();
    }

    if (this.productosSeleccionados[mesaId].has(productoIndex)) {
      this.productosSeleccionados[mesaId].delete(productoIndex);
    } else {
      this.productosSeleccionados[mesaId].add(productoIndex);
    }
  }

  calcularSubtotal(mesa: Mesa): number {
    let subtotal = 0;
    const productos = mesa.pedidoGeneral.productos;

    if (this.productosSeleccionados[mesa.id] && this.productosSeleccionados[mesa.id].size > 0) {
      // Calcular subtotal solo para productos seleccionados
      this.productosSeleccionados[mesa.id].forEach(index => {
        if (productos[index]) {
          subtotal += productos[index].precio * productos[index].cantidad;
        }
      });
    } else {
      // Calcular subtotal para todos los productos si no hay nada seleccionado
      productos.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
      });
    }

    return subtotal;
  }

  calcularPropina(mesa: Mesa): number {
    const subtotal = this.calcularSubtotal(mesa);
    return subtotal * 0.05;
  }

  calcularIVA(mesa: Mesa): number {
    const subtotal = this.calcularSubtotal(mesa);
    return subtotal * 0.15;
  }

  calcularTotalConImpuestos(mesa: Mesa): number {
    const subtotal = this.calcularSubtotal(mesa);
    const iva = this.calcularIVA(mesa);
    const propina = this.calcularPropina(mesa);
    return subtotal + iva + propina;
  }


   mostrarOpcionesPago(mesaId: string) {
    this.mesaMostrandoOpcionesPago = mesaId;  
  }

  procesarPago(mesaId: string, conFactura: boolean) {
    const productosAPagar = Array.from(this.productosSeleccionados[mesaId] || []);
    console.log('Procesando pago:', productosAPagar, conFactura ? 'Con Factura' : 'Sin Factura');

    this.mesaMostrandoOpcionesPago = null;  
  }

  pagarSinFactura(mesa: Mesa) {
    const productosSeleccionados = Array.from(this.productosSeleccionados[mesa.id] || []);
    console.log('Productos seleccionados para eliminar:', productosSeleccionados);

    if (productosSeleccionados.length === 0) {
        // Si no se seleccionó ningún producto, desocupar la mesa (eliminar todos los productos)
        this.mesasService.cambiarEstadoMesa(mesa.id, 'disponible', 0, '')
            .then(() => {
                console.log('Mesa desocupada');
                this.cargarMesasOcupadas(); 
                this.router.navigate(['/mesas']); 
            })
            .catch(error => console.error('Error al desocupar la mesa:', error));
    } else {
        // Si se seleccionaron productos, eliminar solo esos productos
        productosSeleccionados.sort((a, b) => b - a); // Ordenar de mayor a menor índice para evitar problemas al eliminar
        const eliminarProductosPromises = productosSeleccionados.map(index => {
            return this.mesasService.eliminarProductoDePedido(mesa.id, index);
        });

        Promise.all(eliminarProductosPromises)
            .then(() => {
                console.log('Productos seleccionados eliminados');
                this.productosSeleccionados[mesa.id].clear(); // Limpiar selección de productos
                this.cargarMesasOcupadas(); // Volver a cargar las mesas
            })
            .catch(error => console.error('Error al eliminar productos seleccionados:', error));
    }
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

  eliminarProducto(mesaId: string, productoIndex: number) {
    this.mesasService.eliminarProductoDePedido(mesaId, productoIndex)
      .then(() => {

        if (this.productosSeleccionados[mesaId]) {
          this.productosSeleccionados[mesaId].delete(productoIndex);
        }
        this.cargarMesasOcupadas(); 
      })
      .catch(error => console.error('Error al eliminar el producto:', error));
  }

  navigateToMenu(mesaId: string) {
    this.router.navigate(['/menu-restorant'], { queryParams: { mesaId: mesaId } });
  }
}
