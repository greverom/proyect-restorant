import { Route } from '@angular/router';
import { ComidaManagerComponent } from './components/comida-manager/comida-manager.component';
import { MenuRestorantComponent } from './components/menu-restorant/menu-restorant.component';
import { RollosDeCanelaComponent } from './components/rollos-de-canela/rollos-de-canela.component';
import { PostresComponent } from './components/postres/postres.component';
import { CakesComponent } from './components/cakes/cakes.component';
import { PlatosDeComidaComponent } from './components/platos-de-comida/platos-de-comida.component';
import { SopasComponent } from './components/sopas/sopas.component';
import { BebidasAlcoholicasComponent } from './components/bebidas-alcoholicas/bebidas-alcoholicas.component';
import { BebidasNoAlcoholicasComponent } from './components/bebidas-no-alcoholicas/bebidas-no-alcoholicas.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Route[] = [
  { path: 'comida-manager', component: ComidaManagerComponent },
  { path: 'menu-restorant', component: MenuRestorantComponent,
    children: [
      { path: 'rollos-de-canela', component: RollosDeCanelaComponent },
      { path: 'postres', component: PostresComponent },
      { path: 'cakes', component: CakesComponent },
      { path: 'platos-de-comida', component: PlatosDeComidaComponent },
      { path: 'sopas', component: SopasComponent },
      { path: 'bebidas-alcoholicas', component: BebidasAlcoholicasComponent },
      { path: 'bebidas-no-alcoholicas', component: BebidasNoAlcoholicasComponent },
    ]
 },
  { path: 'edit-product', component: EditProductComponent },
  { path: '', redirectTo: 'comida-manager', pathMatch: 'full' },  // Redirigir a comida-manager por defecto
];
