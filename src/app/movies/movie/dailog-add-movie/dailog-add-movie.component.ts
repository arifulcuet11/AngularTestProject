import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../services/message.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dailog-add-movie',
  templateUrl: './dailog-add-movie.component.html',
  styleUrls: ['./dailog-add-movie.component.scss']
})
export class DailogAddMovieComponent implements OnInit {
  movieForm = this.fb.group({
    budget: ['0'],
    originalLang: [''],
    originalTitle: ['', [Validators.required]],
    overview: [''],
    releaseDate: [new Date()],
    revenue: ['', [Validators.required]],
    runtime: ['', [Validators.required]],
    status: ['', [Validators.required]],
    title: ['', [Validators.required]]
  });
  constructor(
    public dialogRef: MatDialogRef<DailogAddMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private movieService: MovieService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}
  addMovie() {
    const model = this.movieForm.value;
    model.releaseDate = new Date(this.movieForm.value.releaseDate);
    this.movieService.create(model).subscribe((res) => {
      this.messageService.show();
      this.dialogRef.close(res);
    });
  }
  close() {
    this.dialogRef.close(null);
  }
}
