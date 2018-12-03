import {Component} from '@angular/core';
import {FooterService} from '@shared/layout/footer/footer.service';

@Component({
  selector: 'mag-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [FooterService]
})
export class FooterComponent {

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
