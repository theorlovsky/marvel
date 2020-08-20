import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StarFill } from '@marvel/shared/ui-star';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const ratingStarsNumber = 5;

@Component({
  selector: 'marvel-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  @Output() readonly ratingChange = new EventEmitter<number>();

  readonly starFills$: Observable<StarFill[]>;

  @Input()
  set rating(rating: number) {
    this.ratingSubject.next(rating);
  }

  private readonly ratingSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.starFills$ = this.ratingSubject.pipe(
      map((rating) => this.mapToStarFills(rating))
    );
  }

  changeRating(rating: number): void {
    this.ratingChange.emit(rating);
  }

  private mapToStarFills(starsFilled: number): StarFill[] {
    return Array.from(Array(ratingStarsNumber), (_, i) => {
      const diff = starsFilled - i;

      if (diff === 0.5) {
        return StarFill.half;
      }

      if (diff > 0) {
        return StarFill.full;
      }

      return StarFill.empty;
    });
  }
}
