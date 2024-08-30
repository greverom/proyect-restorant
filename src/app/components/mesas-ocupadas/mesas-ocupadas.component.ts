import { Component, OnInit } from '@angular/core';
import { Mesa } from '../../models/mesas';
import { MesasService } from '../../services/mesas.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RollosDeCanelaComponent } from '../menu/rollos-de-canela/rollos-de-canela.component';
import { Factura } from '../../models/pago';

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

  mostrarModalFactura: boolean = false;
  mesaSeleccionada!: Mesa;
  factura: Factura = {
    nombre: '',
    cedulaRUC: '',
    correo: '',
    fecha: new Date(),
    productos: [],
    subtotal: 0,
    iva: 0,
    propina: 0,
    total: 0
  };

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
      this.productosSeleccionados[mesa.id].forEach(index => {
        if (productos[index]) {
          subtotal += productos[index].precio * productos[index].cantidad;
        }
      });
    } else {
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

  abrirModalFactura(mesa: Mesa) {
    console.log('Intentando abrir el modal para la mesa:', mesa);
    this.mesaSeleccionada = mesa;  // Asigna la mesa seleccionada para la factura
    this.inicializarFactura(mesa);  // Calcula los detalles de la factura
    this.mostrarModalFactura = true;  // Muestra el modal de factura
  }

  inicializarFactura(mesa: Mesa) {
    this.factura.productos = mesa.pedidoGeneral.productos.map(producto => ({
      nombre: producto.nombre,
      cantidad: producto.cantidad,
      precioUnitario: producto.precio,
      total: producto.precio * producto.cantidad
    }));
    this.calcularTotales();
  }

  calcularTotales() {
    this.factura.subtotal = this.factura.productos.reduce((acc, prod) => acc + prod.total, 0);
    this.factura.iva = this.factura.subtotal * 0.15;
    this.factura.propina = this.factura.subtotal * 0.05;
    this.factura.total = this.factura.subtotal + this.factura.iva + this.factura.propina;
  }

  cerrarModalFactura() {
    this.mostrarModalFactura = false;
  }

  procesarPago(mesaId: string) {
    // Encuentra la mesa seleccionada en la lista de mesas ocupadas
    const mesa = this.mesasOcupadas.find(m => m.id === mesaId);

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

realizarPagoConFactura() {
  console.log('Procesando pago con factura para:', this.factura);
  this.cerrarModalFactura();  
}

  desocuparMesa(mesaId: string) {
    this.mesasService.cambiarEstadoMesa(mesaId, 'disponible', 0, '')
      .then(() => {
        this.cargarMesasOcupadas(); 
        this.router.navigate(['/mesas']); 
      })
      .catch(error => console.error('Error al desocupar la mesa:', error));
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
