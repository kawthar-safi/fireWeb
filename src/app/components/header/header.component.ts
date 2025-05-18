import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '../../services/translate.pipe';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { CartItemService } from '../../services/cart-item.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username = '';
  isLoggedIn = false;
  cartCount = 0;
  isAdmin = false;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private cartService: CartItemService
  ) {}

  ngOnInit(): void {
    //  راقب عدد عناصر السلة
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    // راقب حالة الدخول
    this.authService
      .getLoginStatus()

      .subscribe((status) => {
        this.isLoggedIn = status;

        if (status) {
          this.authService.getUsername().subscribe((name) => {
            this.username = name;
          });
        } else {
          this.username = '';
        }
      });
    this.authService.getRole().subscribe((role) => {
      this.isAdmin = role === 'admin';
    });
    this.username = localStorage.getItem('username') || '';
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.cartService.clearCart();
    this.router.navigate(['/login']);
    this.authService.clearRole();
  }

  gotoAddProduct() {
    this.router.navigate(['/add-product']);
  }
}
