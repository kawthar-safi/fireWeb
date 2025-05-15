import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '../../services/translate.pipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../models/users';

@Component({
  selector: 'app-login',
  imports: [
    TranslatePipe,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  returnUrl: string = '/';
  loginForm = new FormGroup({
    username: new FormControl('', [
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
    private authService: AuthServiceService,
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  createAccount() {
    this.router.navigateByUrl('/create-account');
  }

  onSubmit() {
    this.http.get<Users[]>('http://localhost:3001/users').subscribe((res) => {
      const user = res.find(
        (a: Users) => a.email === this.loginForm.value.email
      );

      if (user) {
        this.authService.login(); // أولاً نعلن عن حالة الدخول
        this.authService.setUsername(user.username); // ثم نحدث اسم المستخدم
        localStorage.setItem('userId', user.id.toString());

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Welcome',
        });

        const redirectUrl = this.authService.getRedirectUrl() || '/';
        this.router.navigateByUrl(redirectUrl);

        this.loginForm.reset();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please create an account',
        });
      }
    });
  }
}
