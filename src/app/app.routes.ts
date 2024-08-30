import { Route } from '@angular/router';
import { MenuRestorantComponent } from './components/menu-restorant/menu-restorant.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { menuRestorantRoutes } from './components/menu-restorant/menu-routes';
import { ComidaManagerComponent } from './components/comida-manager/comida-manager.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { MesasOcupadasComponent } from './components/mesas-ocupadas/mesas-ocupadas.component';



export const routes: Route[] = [
  { path: 'comida-manager', component: ComidaManagerComponent },
  { path: 'edit-product', component: EditProductComponent },
  { 
    path: 'menu-restorant', 
    component: MenuRestorantComponent,
    children: menuRestorantRoutes  
  },
  { path: 'mesas', component: MesasComponent }, 
  { path: 'mesas-ocupadas', component: MesasOcupadasComponent },
  { path: '', redirectTo: 'comida-manager', pathMatch: 'full' },  
  { path: '**', redirectTo: 'comida-manager', pathMatch: 'full' }
];
