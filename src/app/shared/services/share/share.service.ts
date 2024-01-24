import { Injectable } from '@angular/core';
import {ClipboardService} from "ngx-clipboard";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(
    private clipboardService: ClipboardService,
  ) {}

  shareOnFacebook(currentURL: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('u', currentURL);
    const navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
    console.log(navUrl)
    window.open(navUrl, '_blank');
  }

  shareOnInstagram(currentURL: string) {
    console.log(currentURL)
    // const searchParams = new URLSearchParams();
    // searchParams.set('u', currentURL);
    // const navUrl = 'https://www.instagram.com/share?' + searchParams;
    // window.open(navUrl, '_blank');
  }

  shareOnTelegram(currentURL: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('url', currentURL);
    const navUrl = 'https://t.me/share/url?' + searchParams;
    window.open(navUrl, '_blank');
  }

  copyCurrentUrl(currentURL: string): void {
    this.clipboardService.copyFromContent(currentURL);
  }
}
