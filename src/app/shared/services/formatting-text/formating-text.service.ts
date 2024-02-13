import { Injectable } from '@angular/core';
import {Content} from "../../interfaces/about.interface";

@Injectable({
  providedIn: 'root'
})
export class FormattingTextService {

  constructor() {
  }

  splitText(htmlString: string): Content[] {
    const contents = htmlString.match(/<[^>]+>([^<]*)<\/[^>]+>/g);
    let result: Content[] = [];
    if (contents) {
      contents.filter(item => !item.includes("<br>"));
      result = this.findCarousel(contents);
    }

    return result
  }

  findCarousel(contents: string[]): Content[] {
    const imagesIndexes: number[] = [];
    const imagesSrcs: string[] = [];
    let consecutiveImagesCount = 0;
    let isNextImg = false;

    const result: Content[] = [];

    contents.forEach((item, index, array) => {
      if (item.includes("<img")) {
        result.push({images: [], text: ''})
        consecutiveImagesCount++
        isNextImg = index < array.length - 1 && array[index + 1].includes("<img");
        const srcMatch = item.match(/src="([^"]+)"/);
        if (srcMatch) {
          imagesSrcs.push(srcMatch[1]);
        }
        if (!isNextImg) {
          if (consecutiveImagesCount > 1) {
            imagesIndexes.push(index - consecutiveImagesCount + 1);
            imagesIndexes.push(consecutiveImagesCount)
          }
          consecutiveImagesCount = 0;
        }
      } else {
        result.push({images: [], text: item})
        consecutiveImagesCount = 0;
      }
    });

    const replacementArray: Content[] = [{text: "", images: []}]; // Преобразуем объект в массив
    imagesSrcs.forEach(src => {
      replacementArray[0].images.push(src); // Обращаемся к элементу массива
    });

    if (imagesIndexes.length > 0) {
      result.splice(imagesIndexes[0], imagesIndexes[1], ...replacementArray);
    }

    return result;
  }
}
