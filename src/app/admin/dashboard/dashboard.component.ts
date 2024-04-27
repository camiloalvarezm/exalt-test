import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductService } from '../../api/product.service';
import { Product } from '../../core/models/product.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ToastrService } from 'ngx-toastr';

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
    imgPath: 'default',
  };
  public productService = inject(ProductService);
  public toastr = inject(ToastrService);
  public showLoader = true;

  ngOnInit(): void {
    this.showLoader = true;
    setTimeout(() => {
      if (!localStorage.getItem('products')) {
        this.productService.getProducts().subscribe({
          next: (res) => {
            this.products = res;
            localStorage.setItem('products', JSON.stringify(this.products));
          },
          error: (error) => {
            this.toastr.error('Algo salío mal, intente más tarde.', 'Error');
          },
        });
        this.showLoader = false;
        return;
      }
      this.products = JSON.parse(localStorage.getItem('products') || '[]');
      this.showLoader = false;
    }, 1500);
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
    this.products = this.products.filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }

  storeProduct(event: Product) {
    event.id = (this.products.length + 1).toString();
    event.quantity = 1;
    if (this.action == 'add') {
      this.products.unshift(event);
      this.toastr.success(
        'El producto se ha agregado correctamente.',
        'Producto agregado'
      );
    } else if (this.action == 'edit') {
      this.products = this.products.map((p) => {
        if (p.id === event.id) {
          return { ...event };
        }
        return p;
      });
      this.toastr.success(
        'El producto se ha actualizado correctamente.',
        'Producto actualizado'
      );
    }
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
