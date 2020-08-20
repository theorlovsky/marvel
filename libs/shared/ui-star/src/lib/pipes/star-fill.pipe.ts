import { Pipe, PipeTransform } from '@angular/core';
import { StarFill } from '../star-fill';

@Pipe({
  name: 'starFill'
})
export class StarFillPipe implements PipeTransform {
  transform(fill: StarFill): string {
    switch (fill) {
      case StarFill.empty: {
        return 'star_outline';
      }

      case StarFill.half: {
        return 'star_half';
      }

      case StarFill.full: {
        return 'star';
      }

      default: {
        throw new Error('The star fill value is incorrect.');
      }
    }
  }
}
