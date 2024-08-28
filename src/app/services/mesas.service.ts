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
          mesas.push({ ...mesa, id: childSnapshot.key });
        });
        observer.next(mesas);
      }, error => {
        observer.error(error);
      });
    });
  }

   // Método para cambiar el estado de una mesa
  cambiarEstadoMesa(mesaId: string, estado: 'disponible' | 'ocupada', capacidad?: number): Promise<void> {
    const mesaRef = ref(this.db, `mesas/${mesaId}`);
    const updates: Partial<Mesa> = { estado };
    
    if (capacidad !== undefined) {
      updates.capacidad = capacidad;
    }

    return update(mesaRef, updates)
      .then(() => console.log(`Estado de la mesa ${mesaId} actualizado a ${estado} con capacidad de ${capacidad || 'sin cambios'} personas.`))
      .catch(error => console.error('Error al actualizar el estado de la mesa:', error));
  }

  // Método para agregar un producto al pedido general de una mesa
  agregarProductoAlPedido(mesaId: string, producto: ProductoPedido): Promise<void> {
    const mesaRef = ref(this.db, `mesas/${mesaId}/pedidoGeneral/productos`);
    const newProductoRef = push(mesaRef);
    return set(newProductoRef, producto)
      .then(() => console.log('Producto agregado al pedido exitosamente'))
      .catch(error => console.error('Error al agregar el producto al pedido:', error));
  }

  // Método para actualizar el total de un pedido
  actualizarTotalPedido(mesaId: string, total: number): Promise<void> {
    const pedidoRef = ref(this.db, `mesas/${mesaId}/pedidoGeneral`);
    return update(pedidoRef, { total })
      .then(() => console.log('Total del pedido actualizado exitosamente'))
      .catch(error => console.error('Error al actualizar el total del pedido:', error));
  }
}