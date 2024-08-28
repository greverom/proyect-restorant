export interface Alimento {
    id?: string;  
    nombre: string;
    categoria: string;  
    precio: number;
    descripcion: string;
    cantidadDisponible: number;
    imagenUrl?: string;
  }
