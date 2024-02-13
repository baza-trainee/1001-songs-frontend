import { Injectable } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

import {Content} from "../../interfaces/about.interface";

@Injectable({
  providedIn: 'root'
})
export class FormattingTextService {

  constructor(private sanitizer: DomSanitizer) { }

  splitText(htmlString: string): Content {
    const pattern = /<p class="quill-slider">(.*?)<\/p>/g;
    const indexImg: number = this.findIndexOfMultipleImages(htmlString, pattern);

    return htmlString.split(pattern)
      .map((element, index) => {
        if (index !== indexImg) {
          return this.getSafeHtml(element);
        } else {
          return this.extractSrc(htmlString.split(pattern)[indexImg]);
        }
      });
  }

  private findIndexOfMultipleImages(paragraph: string, pattern: RegExp): number {
    return paragraph.split(pattern)
      .findIndex((str) => {
        const imgCount = str.split('<img').length - 1;
        return imgCount > 1;
      });
  }

  private extractSrc(paragraph: string): string[] {
    const innerPattern = /<img src="(.*?)">/g;
    const matches = paragraph.split(innerPattern);
    return matches.filter(value => value.trim() !== "");
  }

  private getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
