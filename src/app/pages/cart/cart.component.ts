import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemService } from '../../services/cart-item.service';
import { TranslatePipe } from '../../services/translate.pipe';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartItemService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // تحميل بيانات السلة من localStorage
  loadCart(): void {
    const cartData = localStorage.getItem('cart');
    this.cartItems = cartData ? JSON.parse(cartData) : [];
    this.calculateTotal();
  }

  // حساب مجموع الأسعار الإجمالي
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  // عدد العناصر الكلي (حسب الكميات)
  getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // إزالة عنصر واحد من السلة
  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  // إفراغ السلة كاملة
  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.total = 0;
    this.cartService.resetcart(); // مثلاً إذا بدك تحدث شي ثاني بالواجهة
  }
}
