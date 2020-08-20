import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { StarFill } from '@marvel/shared/ui-star';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export const ratingStarsNumber = 5;

type OnChangedFn = (rating: number) => void;
type OnTouchedFn = () => void;

@UntilDestroy()
@Component({
  selector: 'marvel-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  @Output() readonly ratingChange = new EventEmitter<number>();

  readonly starFills$: Observable<StarFill[]>;

  @Input()
  set rating(rating: number) {
    this.ratingSubject.next(rating);
  }

  @Input()
  set disabled(disabled: boolean) {
    this.isDisabled = coerceBooleanProperty(disabled);
  }

  private readonly ratingSubject = new BehaviorSubject<number>(0);

  @HostBinding('class.disabled')
  private isDisabled = false;

  private onChanged?: OnChangedFn;
  private onTouched?: OnTouchedFn;

  constructor(@Optional() @Self() private ngControl?: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.starFills$ = this.ratingSubject.pipe(
      distinctUntilChanged(),
      map((rating) => this.mapToStarFills(rating)),
    );
  }

  ngOnInit(): void {
    this.ngControl?.valueChanges?.pipe(untilDestroyed(this)).subscribe((rating) => {
      this.ratingSubject.next(rating);
    });
  }

  changeRating(rating: number): void {
    if (this.isDisabled) {
      return;
    }

    this.setControlValue(rating);
    this.ratingChange.emit(rating);
  }

  registerOnChange(fn: OnChangedFn): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }

  writeValue(rating: number): void {
    this.ratingSubject.next(rating);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
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

  private setControlValue(rating: number): void {
    this.onChanged?.(rating);
    this.onTouched?.();
  }
}
