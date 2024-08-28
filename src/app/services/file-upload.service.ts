import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: Storage) { }

  uploadFile(file: File, path: string): Promise<string> {
    const fileRef = ref(this.storage, path);
    return uploadBytes(fileRef, file).then(() => {
      return getDownloadURL(fileRef); 
    });
  }
}
