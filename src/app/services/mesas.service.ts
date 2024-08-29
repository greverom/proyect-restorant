import { Injectable } from '@angular/core';
import { Database, ref, set, update, onValue, push } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Mesa, ProductoPedido } from '../models/mesas';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private db: Database) { }

  crearMesasIniciales(cantidad: number): Promise<void[]> {
    const promesas: Promise<void>[] = [];
    for (let i = 1; i <= cantidad; i++) {
      const mesa: Mesa = {
        id: '',  // El ID será generado automáticamente por Firebase
        numero: i,
        estado: 'disponible',
        capacidad: 0,  // Capacidad predeterminada
        pedidoGeneral: {
          id: '',
          productos: [],
          total: 0,
          pagado: false
        }
      };
      const mesaRef = ref(this.db, `mesas/mesa_${i}`);
      promesas.push(set(mesaRef, mesa));
    }
    return Promise.all(promesas);
  }

  // Método para obtener todas las mesas
  obtenerMesas(): Observable<Mesa[]> {
    const mesasRef = ref(this.db, 'mesas/');
    return new Observable(observer => {
      onValue(mesasRef, snapshot => {
        const mesas: Mesa[] = [];
        snapshot.forEach(childSnapshot => {
          const mesa = childSnapshot.val() as Mesa;
  
          // Convierte productos de objeto a array
          const productosObj = mesa.pedidoGeneral.productos;
          mesa.pedidoGeneral.productos = productosObj ? Object.values(productosObj) : [];
  
          mesas.push({ ...mesa, id: childSnapshot.key });
        });
        observer.next(mesas);
      }, error => {
        observer.error(error);
      });
    });
  }

 // Método para cambiar el estado de una mesa y opcionalmente asignar capacidad y empleado
cambiarEstadoMesa(mesaId: string, estado: 'disponible' | 'ocupada', capacidad?: number, empleadoAsignado?: string): Promise<void> {
  const mesaRef = ref(this.db, `mesas/${mesaId}`);
  const updates: Partial<Mesa> = { estado };
  
  if (estado === 'ocupada' && capacidad !== undefined && empleadoAsignado) {
    updates.capacidad = capacidad;
    updates.asignadaPor = empleadoAsignado;
  } else if (estado === 'disponible') {
    updates.capacidad = 0;
    updates.asignadaPor = ''; // O puedes eliminar esta propiedad si prefieres

    // Limpiar productos y reiniciar el total del pedido general
    updates.pedidoGeneral = {
      id: '',
      productos: [],
      total: 0,
      pagado: false
    };
  }
  
  return update(mesaRef, updates)
    .then(() => console.log(`Mesa ${mesaId} actualizada a ${estado}.`))
    .catch(error => console.error('Error al actualizar el estado de la mesa:', error));
}

  // Método para agregar un producto al pedido general de una mesa
  agregarProductoAlPedido(mesaId: string, producto: ProductoPedido): Promise<void> {
    const mesaRef = ref(this.db, `mesas/${mesaId}`);

    return new Promise((resolve, reject) => {
      onValue(mesaRef, snapshot => {
        const mesa = snapshot.val() as Mesa | null;

        if (mesa) {
          // Inicializa productos si no existen
          if (!mesa.pedidoGeneral.productos) {
            mesa.pedidoGeneral.productos = [];
          }

          // Busca si el producto ya está en la lista
          const productoExistente = mesa.pedidoGeneral.productos.find(p => p.id === producto.id);

          if (productoExistente) {
            // Si el producto ya existe, aumenta la cantidad
            productoExistente.cantidad += producto.cantidad;
          } else {
            // Si no existe, agrega el nuevo producto
            mesa.pedidoGeneral.productos.push(producto);
          }

          // Actualiza el total
          mesa.pedidoGeneral.total += producto.precio * producto.cantidad;

          // Actualiza la mesa en la base de datos
          update(mesaRef, { pedidoGeneral: mesa.pedidoGeneral })
            .then(() => resolve())
            .catch(err => reject(err));
        } else {
          reject(new Error('Mesa no encontrada'));
        }
      }, {
        onlyOnce: true
      });
    });
  }

  // Método para actualizar el total de un pedido
  actualizarTotalPedido(mesaId: string, total: number): Promise<void> {
    const pedidoRef = ref(this.db, `mesas/${mesaId}/pedidoGeneral`);
    return update(pedidoRef, { total })
      .then(() => console.log('Total del pedido actualizado exitosamente'))
      .catch(error => console.error('Error al actualizar el total del pedido:', error));
  }
}