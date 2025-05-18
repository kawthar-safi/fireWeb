import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3001/users';

  // Subjects لمتابعة حالة الدخول واسم المستخدم
  private loggedInSubject = new BehaviorSubject<boolean>(
    this.isLoggedInFromStorage()
  );
  private usernameSubject = new BehaviorSubject<string>(
    this.getUsernameFromStorage()
  );

  private redirectUrl: string = '/';

  // تحقق من localStorage عند بدء الخدمة (خاصة)
  private isLoggedInFromStorage(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private getUsernameFromStorage(): string {
    return localStorage.getItem('username') || '';
  }

  // دالة عامة لفحص حالة الدخول (تستخدمها في الجارد)
  isLoggedIn(): boolean {
    return this.isLoggedInFromStorage();
  }

  // Observable لمتابعة حالة الدخول
  getLoginStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // Observable لمتابعة اسم المستخدم
  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  // لتحديث حالة الدخول (مثلاً بعد تسجيل دخول أو خروج)
  emitLoginStatus(status: boolean): void {
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    this.loggedInSubject.next(status);
  }

  // لتحديث اسم المستخدم
  emitUsername(name: string): void {
    if (name) {
      localStorage.setItem('username', name);
    } else {
      localStorage.removeItem('username');
    }
    this.usernameSubject.next(name);
  }

  login() {
    this.emitLoginStatus(true);
  }

  logout() {
    this.emitLoginStatus(false);
    this.emitUsername('');
    localStorage.removeItem('userId');
  }

  setUsername(name: string) {
    this.emitUsername(name);
  }

  getUsernameValue(): string {
    return this.usernameSubject.value;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  getUserRole(): string {
    return localStorage.getItem('role') || 'user';
  }

  private roleSubject = new BehaviorSubject<string>(this.getUserRole());

  getRole(): Observable<string> {
    return this.roleSubject.asObservable();
  }

  setUserRole(role: string): void {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  clearRole(): void {
    localStorage.removeItem('role');
    this.roleSubject.next('user'); // أو ''
  }
}
