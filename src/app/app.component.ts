import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { I18nService } from './services/i18n.service';
import { Title } from '@angular/platform-browser';
import { LanguageComponent } from './components/language/language.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LanguageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private i18nService: I18nService, private titleService: Title) {}

  ngOnInit() {
    this.i18nService.loadtranslation('en');
    const translatedTitle = this.i18nService.t('app.title');
    this.titleService.setTitle(translatedTitle);
  }
}
