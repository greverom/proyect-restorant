import { Component } from '@angular/core';
import { AlimentosService } from '../../services/alimentos.service';
import { Alimento } from '../../models/alimento';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas.service';



@Component({
  selector: 'app-comida-manager',
  standalone: true,
  imports: [FormsModule,
            CommonModule
  ],
  templateUrl: './comida-manager.component.html',
  styleUrl: './comida-manager.component.css'
})

export class ComidaManagerComponent {
  alimento: Alimento = {
    nombre: '',
    categoria: '',
    precio: 0,
    descripcion: '',
    cantidadDisponible: 0
  };
  mesaCantidad: number = 10;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private alimentosService: AlimentosService,
              private mesasService: MesasService,
               private router: Router
  ) {}

   // Manejar la selección del archivo y generar la vista previa
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

 // Método para crear mesas
 crearMesas() {
  this.mesasService.crearMesasIniciales(this.mesaCantidad)
    .then(() => {
      this.mostrarSwal('success', `${this.mesaCantidad} mesas creadas exitosamente`);
      this.resetMesaForm();
    })
    .catch(error => {
      this.mostrarSwal('error', 'Error al crear mesas');
      console.error('Error al crear mesas:', error);
    });
}
  guardarAlimento() {
    if (this.selectedFile) {
      // Subir la imagen y guardar el producto
      this.alimentosService.agregarAlimentoConImagen(this.alimento, this.selectedFile)
        .then(() => {
          this.mostrarSwal('success', 'Producto guardado exitosamente');
          this.resetForm();
        })
        .catch(error => {
          this.mostrarSwal('error', 'Error al guardar el producto');
          console.error('Error al guardar el producto:', error);
        });
    } else {
      this.mostrarSwal('error', 'Por favor selecciona una imagen para el producto');
    }
  }
  

  mostrarSwal(icon: 'success' | 'error', title: string) {
    Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false, // No muestra botones
      timer: 2000, // Se cierra automáticamente después de 2 segundos
      timerProgressBar: true, // Muestra una barra de progreso
      position: 'center',
      customClass: {
        popup: 'swal2-centered-popup' // Clase personalizada para ajustes adicionales
      }// Muestra el swal en la esquina superior derecha
    });
  }

  resetForm() {
    this.alimento = {
      nombre: '',
      categoria: '',
      precio: 0,
      descripcion: '',
      cantidadDisponible: 0
    };
    this.selectedFile = null;
  }

  resetMesaForm() {
    this.mesaCantidad = 10; // Reinicia la cantidad de mesas
  }

  navigateToEditProduct() {
    this.router.navigate(['/edit-product']);
  }
}
