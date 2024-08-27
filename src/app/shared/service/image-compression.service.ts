import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressionService {



  constructor(private imageCompress: NgxImageCompressService) { }

  compressImage(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imageArrayBuffer = event.target.result; // ArrayBuffer representing the contents of the file
        const imageBlob = new Blob([imageArrayBuffer], { type: file.type }); // Create a Blob from the ArrayBuffer
        const imageURL = URL.createObjectURL(imageBlob); // Convert Blob to Data URL
        this.imageCompress.compressFile(imageURL, -1, 50, 50).then(
          result => {
            resolve(result); // Return the compressed image data directly
          },
          error => {
            reject(error);
          }
        );
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    });
  }


}
