import { Component } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-language',
  imports: [],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
})
export class LanguageComponent {
  constructor(private i18nService: I18nService) {}
  language: 'en' | 'ar' = 'en';
  switchToArabic() {
    this.language = 'ar';
    this.i18nService.loadtranslation(this.language);
  }

  switchToEnglish() {
    this.language = 'en';
    this.i18nService.loadtranslation(this.language);
  }
}
