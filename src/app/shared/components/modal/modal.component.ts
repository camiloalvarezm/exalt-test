import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../core/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() show: boolean = true;
  @Input() action: string = 'add';
  @Input() formData: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    quantity: 0,
  };
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() productData = new EventEmitter<any>();
  public faCircleXmark = faCircleXmark;

  onClose() {
    this.show = false;
    this.closeModal.emit(false);
    this.formData = {
      id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      quantity: 0,
    };
  }

  onSubmit() {
    this.productData.emit(this.formData);
    this.onClose();
  }
}
