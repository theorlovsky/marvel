import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedUiStarModule } from '@marvel/shared/ui-star';
import { SyncUrlDirective } from './directives/sync-url.directive';
import { RatingComponent } from './rating.component';

@NgModule({
  imports: [CommonModule, SharedUiStarModule, HttpClientModule],
  declarations: [RatingComponent, SyncUrlDirective],
  exports: [RatingComponent, SyncUrlDirective]
})
export class SharedUiRatingModule {}
