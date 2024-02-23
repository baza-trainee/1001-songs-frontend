import { Injectable } from '@angular/core';
import {Content} from "../../interfaces/about.interface";

@Injectable({
  providedIn: 'root'
})
export class FormattingTextService {

  constructor() {}

  splitText(htmlString: string): Content[] {
    const contents = htmlString.split(/<\/?p>/).filter(Boolean);
    const result: Content[] = [];

    contents.forEach(elem => {
      if ((elem.match(/<img/g) || []).length > 1) {
        result.push({ text: "", images: this.getImageUrls(elem) });
      } else {
        result.push({ text: elem, images: [] });
      }
    });

    return result;
  }

  getImageUrls(urls: string): string[] {
    const matches = urls.matchAll(/src="([^"]+)"/g);
    return Array.from(matches, match => match[1]);
  }
}
