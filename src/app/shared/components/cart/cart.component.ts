import { Component, Input, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../core/models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() products: Product[] = [];
  @Input() show: boolean = false;
  public faCircleXmark = faCircleXmark;
  public toastr = inject(ToastrService);

  onClose() {
    this.show = false;
  }

  getImage(path: string) {
    return `../../../../assets/product-images/${path}.jpg`;
  }

  totalCart(): number {
    let total = 0;
    for (let product of this.products) {
      total += product.price * product.quantity;
    }
    return total;
  }

  buyCart() {
    this.toastr.success(
      'Se ha completado la compra exitosamente.',
      'Compra exitosa'
    );
    this.onClose();
  }
}
