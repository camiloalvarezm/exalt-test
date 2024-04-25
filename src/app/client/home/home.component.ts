import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { addNewProduct } from '../../store/actions/product.actions';
import { Product } from '../../core/models/product.model';
import { AppState } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select('products').subscribe((products: any) => {
      this.products = products;
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
