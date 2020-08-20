import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { convertToRating } from '@marvel/shared/ui-rating';

@Component({
  selector: 'marvel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // or just `rating = 3`, for example
  ratingSimple = convertToRating(5, 10);
  ratingControl = new FormControl(3);
  ratingServer?: number;

  ratingSimpleDisabled = false;
}
