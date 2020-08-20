import { ChangeDetectionStrategy, Component } from '@angular/core';
import { convertToRating } from '@marvel/shared/ui-rating';

@Component({
  selector: 'marvel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // or just `rating = 3`, for example
  rating = convertToRating(5, 10);
}
