import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18n: I18nService) {}
  transform(value: string): string {
    return this.i18n.t(value);
  }
}
