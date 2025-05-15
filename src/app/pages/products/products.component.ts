import { Component } from '@angular/core';
import { Products } from '../../models/productDetails';
import { ProductsService } from '../../services/products.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../services/translate.pipe';
import { I18nService } from '../../services/i18n.service';
//import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-products',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  Product: Products[] = [];

  constructor(private productsservice: ProductsService) {}
  ngOnInit() {
    this.productsservice.getAllProducts().subscribe((data) => {
      this.Product = data;
    });
  }
}
