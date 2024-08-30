export interface Factura {
  id?: string; 
  nombre: string;
  cedulaRUC: string;
  correo: string;
  direccion?: string;
  telefono?: string; 
  fecha: Date;
  productos: ProductoFactura[]; 
  subtotal: number;
  iva: number;
  propina: number;
  total: number;
}

export interface ProductoFactura {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
}