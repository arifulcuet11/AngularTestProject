import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HotTableModule } from '@handsontable/angular';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie/movie.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DailogAddMovieComponent } from './movie/dailog-add-movie/dailog-add-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DailogViewDetailsComponent } from './movie/dailog-view-details/dailog-view-details.component';
@NgModule({
  declarations: [MovieComponent, DailogAddMovieComponent, DailogViewDetailsComponent],
  imports: [
    MovieRoutingModule,
    HotTableModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [DailogAddMovieComponent],
})
export class MovieModule {}
