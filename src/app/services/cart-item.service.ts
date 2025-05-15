import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Products } from '../models/productDetails';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  private Cartcount = new BehaviorSubject<number>(0);
  //لاي حد بده يعمل subscribe بستخدم هاد المتغير
  cartCount$ = this.Cartcount.asObservable();

  constructor() {
    this.updateCartCountFromStorage(); // تحميل العدد من localStorage عند بداية الخدمة
  }

  getCartItemCount(): number {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    return cartItems.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
  }
  //هادي بنستخدمها لما نضيف منتج جديد ونمررله الكمية.
  incrementCartCount(by: number = 1) {
    const current = this.Cartcount.value;
    this.Cartcount.next(current + by);
  }

  resetcart() {
    this.Cartcount.next(0);
  }
  // الدالة بتقوم بقراءة بيانات السلة المخزنة في
  // localStorage،
  // وتحسب العدد الإجمالي للعناصر باستخدام
  // reduce(),
  //  وأخيرًا بتحدث القيمة باستخدام
  // Cartcount.next().
  updateCartCountFromStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );
    this.Cartcount.next(total);
  }
}
