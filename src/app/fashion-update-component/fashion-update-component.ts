import { Component } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';
@Component({
  selector: 'app-fashion-update-component',
  standalone: false,
  templateUrl: './fashion-update-component.html',
  styleUrl: './fashion-update-component.css',
})
export class FashionUpdateComponent {
  fashion = new Fashion();
  errMessage = '';

  constructor(private _service: FashionAPIService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.errMessage = 'Please select an image file.';
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.errMessage = 'Could not read the selected image.';
        return;
      }

      this.fashion.fashion_image = reader.result;
      this.errMessage = '';
    };
    reader.onerror = () => {
      this.errMessage = 'Could not read the selected image.';
    };

    reader.readAsDataURL(file);
  }

  putFashion(): void {
    this._service.putFashion(this.fashion).subscribe({
      next: (data) => {
        this.fashion = data;
        this.errMessage = '';
      },
      error: (err: Error) => {
        this.errMessage = err.message;
      },
    });
  }
}

