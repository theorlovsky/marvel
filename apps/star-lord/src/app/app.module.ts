import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedUiRatingModule } from '@marvel/shared/ui-rating';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, SharedUiRatingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
