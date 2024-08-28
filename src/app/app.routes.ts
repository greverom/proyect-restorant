import { Route } from '@angular/router';
import { MenuRestorantComponent } from './components/menu-restorant/menu-restorant.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { menuRestorantRoutes } from './components/menu-restorant/menu-routes';
import { ComidaManagerComponent } from './components/comida-manager/comida-manager.component';
import { MesasComponent } from './components/mesas/mesas.component';




export const routes: Route[] = [
  { path: 'comida-manager', component: ComidaManagerComponent },
  { path: 'edit-product', component: EditProductComponent },
  { 
    path: 'menu-restorant', 
    component: MenuRestorantComponent,
    children: menuRestorantRoutes  
  },
  { path: 'mesas', component: MesasComponent },  // Asegúrate de que la ruta esté usando MesasComponent
  { path: '', redirectTo: 'comida-manager', pathMatch: 'full' },  
  { path: '**', redirectTo: 'comida-manager', pathMatch: 'full' }
];
