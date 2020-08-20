import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiStarModule } from '@marvel/shared/ui-star';
import { RatingComponent } from './rating.component';

@NgModule({
  imports: [CommonModule, SharedUiStarModule],
  declarations: [RatingComponent],
  exports: [RatingComponent],
})
export class SharedUiRatingModule {}
