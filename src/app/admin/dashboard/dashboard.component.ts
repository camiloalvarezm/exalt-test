import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductService } from '../../api/product.service';
import { Product } from '../../core/models/product.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FontAwesomeModule,
    ModalComponent,
    LoaderComponent,
  ],
  providers: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public products: Product[] = [];
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;
  public faPlus = faPlus;
  public action: string = '';
  public showModal: boolean = false;
  public editProductData: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    quantity: 0,
  };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('products')) {
      this.productService.getProducts().subscribe((res) => {
        this.products = res;
        localStorage.setItem('products', JSON.stringify(this.products));
      });
      return;
    }
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  addNewProduct() {
    this.action = 'add';
    this.showModal = true;
  }

  editProduct(product: Product) {
    this.action = 'edit';
    this.editProductData = product;
    this.showModal = true;
  }

  deleteProduct(id: string) {
    console.log('eliminar', id);
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }

  storeProduct(event: Product) {
    console.log('producto a guardar', event);
    const products: Product[] = JSON.parse(
      localStorage.getItem('products') || '[]'
    );
    event.id = (products.length + 1).toString();
    if (this.action == 'add') {
      products.unshift(event);
      localStorage.setItem('products', JSON.stringify(products));
      this.products = products;
    } else if (this.action == 'edit') {
    }
  }
}
