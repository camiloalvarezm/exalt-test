import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { addNewProduct } from '../../store/actions/product.actions';
import { Product } from '../../core/models/product.model';
import { AppState } from '../../store';
import { ProductService } from '../../api/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private store: Store<AppState>,
    private productService: ProductService
  ) {
    this.store.select('products').subscribe((products: any) => {
      this.products = products;
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products)
    });
  }

  addProduct() {
    this.store.dispatch(
      addNewProduct({
        product: { id: '', name: '', description: '', price: 12, stock: 1 },
      })
    );
  }
}
