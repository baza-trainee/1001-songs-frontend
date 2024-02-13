import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormattingTextService {

  constructor() { }

  splitText(htmlString: string): (string | string[] | null)[] {
    const pattern = /<p class="quill-slider">(.*?)<\/p>/g;

    const index: number = htmlString.split(pattern).findIndex((str) => {
      const imgCount = str.split('<img').length - 1;
      return imgCount > 1;
    });

    const srt: (string | string[] | null)[] = htmlString.split(pattern);
    srt[index]= this.extractSrcFromParagraphs(htmlString.split(pattern)[index]);

    return srt;
  }

  extractSrcFromParagraphs(paragraph: string): string[] | null {
    const innerPattern = /<img src="(.*?)">/g;
    const matches = paragraph.split(innerPattern);
    return matches.filter(value => value.trim() !== "");
  }
}
