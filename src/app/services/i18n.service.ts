import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  translatin: Record<string, string> | null = null;
  currentLang: 'en' | 'ar' = 'en';
  constructor(private http: HttpClient) {}
  async loadtranslation(lang: 'en' | 'ar'): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.get<Record<string, string>>(`assets/i18n/${lang}.json`)
      );

      this.translatin = res;
      this.currentLang = 'ar';
      localStorage.setItem('lang', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      return true;
    } catch (error) {
      console.error('error loading translation', error);
      return false;
    }
  }
  getlang(): 'en' | 'ar' {
    return this.currentLang;
  }
  setlang(lang: 'en' | 'ar') {
    this.currentLang = lang;
  }
  //وظيفتها انه اذا في قيمة للkey حطها واا فش اعطيني ال key نفسه
  t(key: string): string {
    if (!this.translatin) return key;
    const keys = key.split('.');
    let value: unknown = this.translatin;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }
}
