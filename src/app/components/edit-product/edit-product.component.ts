import { Component, OnInit } from '@angular/core';
import { AlimentosService } from '../../services/alimentos.service';
import { Alimento } from '../../models/alimento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule,
            FormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
 categorias: string[] = [
  'Postres', 
  'Cakes', 
  'Rollos de canela', 
  'Platos de comida', 
  'Sopas', 
  'Bebidas alcohólicas', 
  'Bebidas no alcohólicas'
];

productosPorCategoria: { [key: string]: Alimento[] } = {};
productoSeleccionado: Alimento | null = null;
productoTemporal: Alimento | null = null;
isModalOpen: boolean = false;

selectedFile: File | null = null;  
previewUrl: string | null = null; 

  constructor(private alimentosService: AlimentosService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.categorias.forEach(categoria => {
      this.alimentosService.obtenerAlimentos(categoria).subscribe((data: Alimento[]) => {
        this.productosPorCategoria[categoria] = data;
      });
    });
  }

  abrirModal(producto: Alimento) {
    this.productoSeleccionado = producto;
    this.productoTemporal = { ...producto };
    this.isModalOpen = true; 
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.productoTemporal = null;  
    this.selectedFile = null;  
    this.previewUrl = null;  
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  guardarCambios() {
    if (this.productoSeleccionado && this.productoTemporal) {

      Object.assign(this.productoSeleccionado, this.productoTemporal);

      if (this.selectedFile) {
        this.alimentosService.actualizarAlimentoConImagen(this.productoSeleccionado, this.selectedFile)
          .then(() => this.cerrarModal())
          .catch(error => console.error('Error al guardar el producto:', error));
      } else {
        this.alimentosService.actualizarAlimento(this.productoSeleccionado.categoria, this.productoSeleccionado.id!, this.productoSeleccionado)
          .then(() => this.cerrarModal())
          .catch(error => console.error('Error al guardar el producto:', error));
      }
    }
  }

  eliminarImagen() {
    this.previewUrl = null;
    this.selectedFile = null;
  }
  
}

