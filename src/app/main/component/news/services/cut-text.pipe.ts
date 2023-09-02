import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'cutText',
  standalone: true
})
export class CutText implements PipeTransform {

  transform(value: string[], ...args: number[] ): string {
    return value.join(' ').split(' ').splice(0, args[0]).join(' ') + "...";

  }

}
