import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { DetailsProductsComponent } from './pages/details-products/details-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthServiceService } from './services/auth-service.service';
import { inject } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!authService.isLoggedIn()) {
    authService.setRedirectUrl(state.url);
    return router.createUrlTree(['/login']);
  }
  return true;
};
export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
  },
  { path: 'details/:id', component: DetailsProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'details', component: DetailsProductsComponent },
];
