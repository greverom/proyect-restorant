import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../models/alimento';
import { AlimentosService } from '../../services/alimentos.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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
    'Bebidas alcoholicas', 
    'Bebidas no alcoholicas'
  ];
  mesaId: string | null = null;

  constructor(private alimentosService: AlimentosService,
               private router: Router,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.mesaId = params.get('mesaId');
      console.log('ID de la mesa seleccionada:', this.mesaId);
    });

    this.cargarAlimentos();
  }

  navigateToCategory(categoria: string) {
    const route = categoria.toLowerCase().replace(/ /g, '-');
    this.router.navigate([`/menu-restorant/${route}`], { queryParams: { mesaId: this.mesaId } });
  }

  cargarAlimentos() {
    const categorias = ['Postres', 'Cakes', 'Rollos de canela', 'Platos de comida', 'Sopas', 'Bebidas alcoholicas', 'Bebidas no alcoholicas'];
    
    categorias.forEach(categoria => {
      this.alimentosService.obtenerAlimentos(categoria).subscribe((data: Alimento[]) => {
        this.alimentos.push(...data); // Almacenar los alimentos en la variable alimentos si es necesario
      });
    });
  }
}
