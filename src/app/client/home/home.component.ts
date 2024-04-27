import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../api/product.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { CartComponent } from '../../shared/components/cart/cart.component';

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
    CartComponent,
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
  public toastr = inject(ToastrService);
  public cartItems: Product[] = [];
  public showCart = false;

  constructor() {
    this.imagePath = '../../../assets/product-images/';
  }

  ngOnInit(): void {
    this.showLoader = true;
    setTimeout(() => {
      if (!localStorage.getItem('products')) {
        this.productService.getProducts().subscribe((products) => {
          this.products = products;
        });
      } else {
        this.products = JSON.parse(localStorage.getItem('products') || '[]');
      }
      this.showLoader = false;
    }, 1500);
    if (localStorage.getItem('cart')) {
      this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  getImagePath(imgPath: string): string {
    return this.imagePath + imgPath + '.jpg';
  }

  handleImageError(event: any) {
    event.target.src = this.imagePath + 'default.jpg';
  }

  addProductToCart(product: Product) {
    const index = this.productExist(product);
    if (index >= 0) {
      this.cartItems[index].quantity += product.quantity;
    } else {
      this.cartItems.push(product);
    }
    this.toastr.success(
      `Has agregado ${product.quantity} unidades de ${product.name}`,
      'Producto agregado'
    );
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  productExist(product: Product): number {
    return this.cartItems.findIndex((p: Product) => p.id === product.id);
  }

  showCartEvent(event: boolean) {
    this.showCart = event;
    if (!localStorage.getItem('cart')) {
      this.cartItems = [];
    }
  }
}
