import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  addAllProducts,
  addNewProduct,
} from '../../store/actions/product.actions';
import { Product } from '../../core/models/product.model';
import { AppState } from '../../store';
import { ProductService } from '../../api/product.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FormsModule,
    FontAwesomeModule,
    LoaderComponent,
  ],
  providers: [CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];
  public faCartPlus = faCartPlus;
  public imagePath: string;
  public showLoader = false;
  public productService = inject(ProductService);

  constructor() {
    this.imagePath = '../../../assets/product-images/';
  }

  ngOnInit(): void {
    this.showLoader = true;
    setTimeout(() => {
      if (!localStorage.getItem('products')) {
        this.productService.getProducts().subscribe((products) => {
          this.products = products;
          console.log('lo que llega del servicio', products);
        });
      } else {
        this.products = JSON.parse(localStorage.getItem('products') || '[]');
      }
      this.showLoader = false;
    }, 1500);
  }

  getImagePath(productId: string): string {
    return this.imagePath + productId + '.jpg';
  }

  handleImageError(event: any) {
    event.target.src = this.imagePath + 'default.jpg';
  }

  addProductToCart(product: Product) {}
}
