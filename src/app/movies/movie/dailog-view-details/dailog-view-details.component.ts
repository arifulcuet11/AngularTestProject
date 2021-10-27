import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dailog-view-details',
  templateUrl: './dailog-view-details.component.html',
  styleUrls: ['./dailog-view-details.component.scss']
})
export class DailogViewDetailsComponent implements OnInit {
  movieId = 0;
  movieDetail!: Movie;
  constructor(
    public dialogRef: MatDialogRef<DailogViewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = this.data.movieId;
    this.getMovieById(this.movieId);
  }
  getMovieById(id: number) {
    this.movieService.getById(id).subscribe((res: Movie) => {
      this.movieDetail = res;
    });
  }
}
