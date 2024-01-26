import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText',
  standalone: true
})
export class FormatTextPipe implements PipeTransform {

  transform(value: string): string {
    const paragraphs = value.split('\r\n\r\n');
    const result = paragraphs.map(paragraph => paragraph.replace(/\r\n/g, '<br>')).join('</p><p>');
    return `<p>${result}</p>`;
  }

}
