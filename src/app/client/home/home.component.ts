import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { addNewProduct } from '../../store/actions/product.actions';
import { Product } from '../../core/models/product.model';
import { AppState } from '../../store';
import { ProductService } from '../../api/product.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private currencyPipe: CurrencyPipe
  ) {
    this.store.select('products').subscribe((products: any) => {
      this.products = [];
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
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
