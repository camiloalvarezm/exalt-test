import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClientsComponent } from './login-clients.component';

describe('LoginClientsComponent', () => {
  let component: LoginClientsComponent;
  let fixture: ComponentFixture<LoginClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
