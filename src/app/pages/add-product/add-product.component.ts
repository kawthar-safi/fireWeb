import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Products } from '../../models/productDetails';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  constructor(private http: HttpClient, private router: Router) {}

  AddProducte = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    image: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.AddProducte.valid) {
      const newProduct = this.AddProducte.value;

      this.http
        .post<Products>('http://localhost:3001/products', newProduct)
        .subscribe((res) => {
          if (res.id) {
            this.router.navigate(['/products']);
          }
        });
    }
  }
}
