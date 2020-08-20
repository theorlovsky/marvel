import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedUiRatingModule } from '@marvel/shared/ui-rating';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, SharedUiRatingModule, ReactiveFormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
