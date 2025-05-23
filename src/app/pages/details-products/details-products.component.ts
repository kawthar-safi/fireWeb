import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../models/productDetails';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../services/translate.pipe';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CartItemService } from '../../services/cart-item.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-products',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, ReactiveFormsModule],
  templateUrl: './details-products.component.html',
  styleUrl: './details-products.component.scss',
})
export class DetailsProductsComponent {
  product!: Products;
  quantityForm!: FormGroup;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartItemService,
    private http: HttpClient
  ) {}
  products: Products | null = null;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.productService.getproductsById(id).subscribe((data) => {
      this.product = data;
    });

    this.quantityForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  goToCart() {
    const quantity = this.quantityForm.value.quantity;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const item = {
      ...this.product,
      quantity,
      total: this.product.price * quantity,
    };

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    this.cartService.incrementCartCount(quantity); // ← نمرر الكمية المختارة
    this.router.navigate(['/cart']);
  }
}
