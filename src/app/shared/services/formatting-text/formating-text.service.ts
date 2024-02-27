import { Injectable } from '@angular/core';
import {Content} from "../../interfaces/about.interface";

@Injectable({
  providedIn: 'root'
})
export class FormattingTextService {

  constructor() {}

  splitText(htmlString: string): Content[] {
    const contents = htmlString.split(/<\/?p>/).filter(Boolean);

    return contents.reduce((acc, elem) => {
      if ((elem.match(/<img/g) || []).length > 1) {
        acc.push({ text: "", images: this.getImageUrls(elem) });
      } else {
        acc.push({ text: elem, images: [] });
      }
      return acc
    }, [] as Content[])
  }

  getImageUrls(urls: string): string[] {
    const matches = urls.matchAll(/src="([^"]+)"/g);
    return Array.from(matches, match => match[1]);
  }
}
