import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit {
  @Input() message!: string;
  @Input() type!: string;
  public messageColors!: string;
  public faCircleXmark = faCircleXmark;
  public showAlert = true;

  constructor() {}

  ngOnInit(): void {
    this.messageColors =
      this.type === 'error'
        ? 'border-red-600 bg-red-200 text-red-600'
        : 'border-green-600 bg-green-200 text-green-600';
  }

  onClose() {
    this.showAlert = false;
  }
}
