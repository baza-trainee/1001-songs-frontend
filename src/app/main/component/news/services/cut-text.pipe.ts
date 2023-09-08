import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
  standalone: true
})
export class CutText implements PipeTransform {
  transform(value: string[], ...args: number[]): string {
    if (args.length > 0 && args[0] > 0) {
      if (Array.isArray(value)) {
        return value.join(' ').split(' ').splice(0, args[0]).join(' ') + '...';
      }
    }

    return value.join(' ');
  }
}
