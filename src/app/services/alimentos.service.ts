import { Injectable } from '@angular/core';
import { Database, ref, set, push, update, remove, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Alimento } from '../models/alimento';
import { Storage, ref as storageRef, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  constructor(private db: Database,
              private storage: Storage
  ) { }

  // Método para agregar un nuevo alimento con imagen
  agregarAlimentoConImagen(alimento: Alimento, file: File): Promise<void> {
    // Crear una referencia en Firebase Storage para la imagen
    const imageRef = storageRef(this.storage, `productos/${file.name}`);
    
    // Subir la imagen a Firebase Storage
    return uploadBytes(imageRef, file)
      .then(snapshot => {
        // Obtener la URL de descarga de la imagen
        return getDownloadURL(snapshot.ref);
      })
      .then(downloadURL => {
        // Asignar la URL de la imagen al alimento
        alimento.imagenUrl = downloadURL;

        // Guardar el alimento en la base de datos
        const alimentosRef = ref(this.db, `alimentos/${alimento.categoria}`);
        const newAlimentoRef = push(alimentosRef);
        return set(newAlimentoRef, alimento);
      })
      .then(() => {
        console.log('Alimento con imagen guardado exitosamente');
      })
      .catch(error => {
        console.error('Error al guardar el alimento con imagen:', error);
      });
  }

  // Método para agregar un nuevo alimento a la categoría correspondiente
  agregarAlimento(alimento: Alimento): Promise<void> {
    const alimentosRef = ref(this.db, `alimentos/${alimento.categoria}`);
    const newAlimentoRef = push(alimentosRef);
    return set(newAlimentoRef, alimento)
      .then(() => console.log('Alimento agregado exitosamente'))
      .catch(error => console.error('Error al agregar alimento:', error));
  }

  // Método para obtener los alimentos de una categoría
  obtenerAlimentos(categoria: string): Observable<Alimento[]> {
    const alimentosRef = ref(this.db, `alimentos/${categoria}`);
    return new Observable((observer) => {
      onValue(alimentosRef, (snapshot) => {
        const alimentos: Alimento[] = [];
        snapshot.forEach((childSnapshot) => {
          const alimento = childSnapshot.val() as Alimento;
          alimentos.push({ ...alimento, id: childSnapshot.key });
        });
        observer.next(alimentos);
      }, (error) => {
        observer.error(error);
      });
    });
  }

  // Método para actualizar un alimento existente
  actualizarAlimento(categoria: string, id: string, alimento: Alimento): Promise<void> {
    const alimentoRef = ref(this.db, `alimentos/${categoria}/${id}`);
    return update(alimentoRef, alimento)
      .then(() => console.log('Alimento actualizado exitosamente'))
      .catch(error => console.error('Error al actualizar alimento:', error));
  }

    // Método para actualizar un alimento con nueva imagen
    actualizarAlimentoConImagen(alimento: Alimento, file: File): Promise<void> {
      const filePath = `productos/${alimento.categoria}/${alimento.nombre}_${Date.now()}`;
      const fileRef = storageRef(this.storage, filePath);
      
      return uploadBytes(fileRef, file)
        .then(() => getDownloadURL(fileRef))
        .then((downloadURL) => {
          // Actualizar la URL de la imagen en el objeto alimento
          alimento.imagenUrl = downloadURL;
          // Luego, actualizar la base de datos con la nueva información
          return this.actualizarAlimento(alimento.categoria, alimento.id!, alimento);
        })
        .catch(error => {
          console.error('Error al subir la imagen o actualizar el alimento:', error);
          throw error;
        });
    }

  // Método para eliminar un alimento
  eliminarAlimento(categoria: string, id: string): Promise<void> {
    const alimentoRef = ref(this.db, `alimentos/${categoria}/${id}`);
    return remove(alimentoRef)
      .then(() => console.log('Alimento eliminado exitosamente'))
      .catch(error => console.error('Error al eliminar alimento:', error));
  }
}

