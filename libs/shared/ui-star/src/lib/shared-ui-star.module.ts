import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StarFillPipe } from './pipes/star-fill.pipe';
import { StarComponent } from './star.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StarComponent, StarFillPipe],
  exports: [StarComponent]
})
export class SharedUiStarModule {
}
