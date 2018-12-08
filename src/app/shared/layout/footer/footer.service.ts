import {Injectable} from '@angular/core';
import {Language} from '@models/Language';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Injectable()
export class FooterService {

  static LANG_CODE = 'lang';

  languages: Language[] = [
    {
      name: 'Українська',
      code: 'ua'
    },
    {
      name: 'English',
      code: 'en'
    },
    {
      name: 'Русский',
      code: 'ru'
    }
  ];

  constructor(private readonly _translateService: TranslateService,
              private readonly title: Title) {}

  getCurrentLanguage(): string {
    const language = localStorage.getItem(FooterService.LANG_CODE);
    if (language) {
      return language;
    }
    return 'ua';
  }

  setCurrentLanguage(lang: string): void {
    localStorage.setItem(FooterService.LANG_CODE, lang);
    this._translateService.use(lang);
    this._translateService.get('header.logo_text').subscribe(value => this.title.setTitle(value));
  }

  initLanguage(): void {
    this.setCurrentLanguage(this.getCurrentLanguage());
  }
}
