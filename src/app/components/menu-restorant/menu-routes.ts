import { Route } from '@angular/router';
import { RollosDeCanelaComponent } from '../menu/rollos-de-canela/rollos-de-canela.component';
import { PostresComponent } from '../menu/postres/postres.component';
import { CakesComponent } from '../menu/cakes/cakes.component';
import { PlatosDeComidaComponent } from '../menu/platos-de-comida/platos-de-comida.component';
import { SopasComponent } from '../menu/sopas/sopas.component';
import { BebidasNoAlcoholicasComponent } from '../menu/bebidas-no-alcoholicas/bebidas-no-alcoholicas.component';
import { BebidasAlcoholicasComponent } from '../menu/bebidas-alcoholicas/bebidas-alcoholicas.component';


export const menuRestorantRoutes: Route[] = [
  { path: 'rollos-de-canela', component: RollosDeCanelaComponent },
  { path: 'postres', component: PostresComponent },
  { path: 'cakes', component: CakesComponent },
  { path: 'platos-de-comida', component: PlatosDeComidaComponent },
  { path: 'sopas', component: SopasComponent },
  { path: 'bebidas-alcoholicas', component: BebidasAlcoholicasComponent },
  { path: 'bebidas-no-alcoholicas', component: BebidasNoAlcoholicasComponent },
];