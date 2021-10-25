import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotTableModule } from '@handsontable/angular';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [
      MovieRoutingModule,
      HotTableModule
    ],
  providers: []
})
export class MovieModule {}
