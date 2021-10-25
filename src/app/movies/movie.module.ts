import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    MovieRoutingModule
  ],
  providers: [],
})
export class MovieModule { }
