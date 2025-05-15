import { Component } from '@angular/core';
import { TranslatePipe } from '../../services/translate.pipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-account',
  imports: [
    TranslatePipe,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  signUp = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}

  signUpFun() {
    this.signUp.value;
    //console.log(this.signUp.value);
    this.http.post('http://localhost:3001/users', this.signUp.value).subscribe(
      (res) => {
        this.showSuccess();
        this.router.navigateByUrl('/login');
        this.signUp.reset();
      },
      (err) => {
        alert('Somthing went wrong');
      }
    );
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: ' Welcome',
    });
  }
  onReset() {
    this.signUp.reset();
  }
}
