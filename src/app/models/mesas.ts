export interface Mesa {
    id: string;
    numero: number;
    estado: 'disponible' | 'ocupada';
    capacidad: number;
    pedidoGeneral: Pedido; 
    asignadaPor?: string;
  }

  export interface Pedido {
    id: string;  
    productos: ProductoPedido[];  
    total: number;  
    pagado: boolean;  
  }
  
  export interface ProductoPedido {
    id: string;  
    nombre: string;  
    precio: number; 
    cantidad: number;  
  }