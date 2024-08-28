import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../models/alimento';
import { AlimentosService } from '../../services/alimentos.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-restorant',
  standalone: true,
  imports: [CommonModule,
              RouterOutlet
  ],
  templateUrl: './menu-restorant.component.html',
  styleUrl: './menu-restorant.component.css'
})
export class MenuRestorantComponent implements OnInit {
  alimentos: Alimento[] = [];
  categorias: string[] = [
    'Postres', 
    'Cakes', 
    'Rollos de canela', 
    'Platos de comida', 
    'Sopas', 
    'Bebidas alcohólicas', 
    'Bebidas no alcohólicas'
  ];

  constructor(private alimentosService: AlimentosService,
               private router: Router) {}

  ngOnInit() {
    this.cargarAlimentos();
  }

  navigateToCategory(categoria: string) {
    const route = categoria.toLowerCase().replace(/ /g, '-');
    this.router.navigate([`/menu-restorant/${route}`]);
  }

  cargarAlimentos() {
    const categorias = ['Postres', 'Cakes', 'Rollos de canela', 'Platos de comida', 'Sopas', 'Bebidas alcohólicas', 'Bebidas no alcohólicas'];
    
    categorias.forEach(categoria => {
      this.alimentosService.obtenerAlimentos(categoria).subscribe((data: Alimento[]) => {
        console.log(`Alimentos en la categoría ${categoria}:`, data);
        this.alimentos.push(...data); // Almacenar los alimentos en la variable alimentos si es necesario
      });
    });
  }
}
