import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/productDetails';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3001/products';

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }

  getproductsById(id: string): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/${id}`);
  }
}
