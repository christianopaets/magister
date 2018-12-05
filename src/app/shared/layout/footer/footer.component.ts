import {Component} from '@angular/core';
import {FooterService} from '@shared/layout/footer/footer.service';

@Component({
  selector: 'mag-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [FooterService]
})
export class FooterComponent {

  private _config = {
    mail: 'mailto:christianopaet@gmail.com',
    github: 'https://github.com/kris120197',
    linkedin: 'https://www.linkedin.com/in/christian-opaets-1b12b0160/',
    facebook: 'https://www.facebook.com/opaet.christian',
    telegram: 'https://t.me/christianopaets',
    pinterest: 'https://www.pinterest.com/christianopaet'
  };

  get config() {
    return this._config;
  }

  currentLang: string;

  constructor(readonly footerService: FooterService) {
    this.currentLang = this.footerService.getCurrentLanguage();
    this.footerService.initLanguage();
  }

  setCurrentLanguage(lang: string) {
    this.footerService.setCurrentLanguage(lang);
    this.currentLang = this.footerService.getCurrentLanguage();
  }
}
