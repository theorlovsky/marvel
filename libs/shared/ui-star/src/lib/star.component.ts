import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StarFill } from './star-fill';

@Component({
  selector: 'marvel-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarComponent {
  @Input() readonly fill: StarFill = StarFill.empty;
}
