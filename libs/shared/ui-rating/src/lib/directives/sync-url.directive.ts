import { Directive, Input, OnInit, Self } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RatingComponent } from '../rating.component';
import { RatingService } from '../services/rating.service';

@UntilDestroy()
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'marvel-rating[syncUrl]',
  providers: [RatingService],
})
export class SyncUrlDirective implements OnInit {
  @Input()
  set syncUrl(syncUrl: string | null) {
    this.ratingService.setUrl(syncUrl);

    this.ratingService
      .getRating()
      .pipe(this.catchServiceError("Couldn't get rating from the server"), untilDestroyed(this))
      .subscribe((rating) => {
        this.ratingComponent.rating = rating;
      });
  }

  constructor(@Self() private ratingComponent: RatingComponent, @Self() private ratingService: RatingService) {}

  ngOnInit(): void {
    this.ratingComponent.ratingChange.pipe(untilDestroyed(this)).subscribe((rating) => {
      this.syncWithServer(rating);
    });
  }

  private syncWithServer(rating: number): void {
    this.ratingService
      .saveRating(rating)
      .pipe(this.catchServiceError("Rating wasn't saved"), untilDestroyed(this))
      .subscribe(() => {
        this.ratingComponent.rating = rating;
      });
  }

  private catchServiceError<T>(errorMessage: string): OperatorFunction<T, T | never> {
    return catchError((error) => {
      console.error(errorMessage, error);

      return EMPTY;
    });
  }
}
