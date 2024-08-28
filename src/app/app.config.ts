import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage'; 
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { routes } from './app.routes';  // Importa las rutas desde app.routes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Proveer las rutas definidas
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),  // Inicializar Firebase
    provideDatabase(() => getDatabase()),  // Proporcionar Realtime Database
    provideStorage(() => getStorage())  // Proporcionar Firebase Storage
  ]
};

