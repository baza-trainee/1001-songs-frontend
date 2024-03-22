import { Injectable } from '@angular/core';
import { Content } from '../../interfaces/about.interface';

@Injectable({
  providedIn: 'root'
})
export class FormattingTextService {
  constructor() {}

  checkEmptyElement(element: string) {
    const regExp = new RegExp('>.{2,}<');
    const res = element.match(regExp);
    return res;
  }

  getParagraphs(src: string) {
    const pattern = /<p>(.*?)<\/p>/g;
    const res = src.match(pattern);
    return res ? res: [];
  }

  splitText(htmlString: string): Content[] {
    const contents = htmlString.split(/<\/?p>/).filter(Boolean);

    return contents.reduce((acc, elem) => {
      if ((elem.match(/<img/g) || []).length > 1) {
        acc.push({ text: '', images: this.getImageUrls(elem) });
      } else {
        acc.push({ text: elem, images: [] });
      }
      return acc;
    }, [] as Content[]);
  }

  getImageUrls(urls: string): string[] {
    const matches = urls.matchAll(/src="([^"]+)"/g);
    return Array.from(matches, (match) => match[1]);
  }
}
