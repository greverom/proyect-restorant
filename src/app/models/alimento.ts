export interface Alimento {
    id?: string;  // Opcional, en caso de que quieras manejar IDs generados por Firestore
    nombre: string;
    categoria: string;  // Ejemplo: 'postres', 'cake', 'rollos', etc.
    precio: number;
    descripcion: string;
    cantidadDisponible: number;
    imagenUrl?: string;
  }