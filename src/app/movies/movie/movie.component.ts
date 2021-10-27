import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { Movie } from '../models/movie';
import { MovieRequest } from '../models/movie-request';
import { MessageService } from '../services/message.service';
import { MovieService } from '../services/movie.service';
import { DailogAddMovieComponent } from './dailog-add-movie/dailog-add-movie.component';
import { DailogViewDetailsComponent } from './dailog-view-details/dailog-view-details.component';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  columns: string[] = [
    'ID',
    'Title',
    'Overview',
    'Popularity',
    'Revenue',
    'Runtime',
    'Status',
    'Tagline',
    'Vote<br>Avg.',
    'Vote<br>Count',
    'Release<br>Date',
    'Action'
  ];
  pages = 0;
  currentIndex = 0;
  pageIndex: number[] = [];
  currentPageData: Movie[] = [];
  hotSettings: Handsontable.GridSettings = {};
  private hotRegisterer = new HotTableRegisterer();
  id = '';
  constructor(
    private movieService: MovieService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {
    // do nothing
  }

  ngOnInit(): void {
    this.id = 'handsonTableId';
    this.configureTable();
    this.getMovies();
  }
  getMovies() {
    this.movieService.get().subscribe((res: Movie[]) => {
      this.movies = res.filter((f) => !f.deletedAt);
      this.pages = Math.round(res.length / 10);
      for (let i = 0; i < this.pages; i++) {
        this.pageIndex.push(i);
      }
      this.renderPage(this.currentIndex);
    });
  }
  configureTable() {
    this.hotSettings = {
      autoWrapRow: true,
      height: 'auto',
      width: '100%',
      columnSorting: true,
      fillHandle: false,
      dropdownMenu: ['filter_by_condition', 'filter_action_bar'],
      filters: true,
      colHeaders: this.columns,
      licenseKey: 'non-commercial-and-evaluation',
      afterOnCellMouseDown: (
        event: any,
        coords: { col: number; row: number },
        TD: HTMLElement
      ) => this.renderMouseClickDown(event, coords, TD),
      columns: [
        { data: 'id', type: 'numeric', readOnly: true },
        { data: 'title', type: 'text' },
        { data: 'overviewShort', type: 'text' },
        { data: 'popularity', type: 'text' },
        { data: 'revenue', type: 'text' },
        { data: 'runtime', type: 'text' },
        { data: 'status', type: 'text' },
        { data: 'tagline', type: 'text' },
        { data: 'voteAverage', type: 'numeric' },
        { data: 'voteCount', type: 'numeric' },
        { data: 'releaseDate', type: 'text' },
        {
          readOnly: true,
          renderer: (
            instance,
            TD,
            row,
            col,
            prop,
            value,
            cellProperties
          ): HTMLTableCellElement => {
            TD.innerHTML = `<button class="delete-btn" id="${row}">Delete</button><button class="view-btn" id="${row}">view</button>`;
            return TD;
          }
        }
      ],
      colWidths: (index: number) => {
        if (index === 0) return 40;
        else if (index === 2) return 250;
        else if (index === 5) return 80;
        else if (index === 6) return 70;
        else if (index === 8) return 70;
        else if (index === 9) return 70;
        return '100%';
      },
      afterChange: (changes: any, source) =>
        this.renderAfterChange(changes, source)
    };
  }
  renderAfterChange(changes: any, source: any) {
    if (source !== 'loadData') {
      console.log(changes[0][2], changes[0][3]);
      if (changes[0][2] !== changes[0][3]) {
        const item: any = this.hotRegisterer
          .getInstance(this.id)
          .getSourceDataAtRow(changes[0][0]);
        this.updateMovie(item.id, item);
      }
    }
  }
  renderMouseClickDown(
    event: any,
    coords: { col: number; row: number },
    TD: HTMLElement
  ) {
    const target = event.target as HTMLElement;
    // console.log(target, target.getAttribute('class'));
    if (coords.col === 11) {
      const item: any = this.hotRegisterer
        .getInstance(this.id)
        .getSourceDataAtRow(coords.row);
      if (target.getAttribute('class') === 'view-btn') {
        this.viewDetail(item.id);
      } else if (target.getAttribute('class') === 'delete-btn') {
        this.deleteMovie(item.id);
      }
    }
  }

  renderPage(index: number) {
    this.currentIndex = index;
    this.currentPageData = this.movies.slice(index * 10, index * 10 + 10);
    this.currentPageData.forEach((ele: Movie) => {
      if (ele.overview.length > 100) {
        ele.overviewShort = ele.overview.slice(0, 100).concat('...');
      }
    });
    this.hotRegisterer.getInstance(this.id).loadData(this.currentPageData);
  }
  deleteMovie(id: number) {
    this.movieService.delete(id).subscribe((res) => {
      this.movies = this.movies.filter((x) => x.id !== id);
      this.renderPage(this.currentIndex);
      this.messageService.show(this.messageService.msgDelete);
    });
  }
  updateMovie(id: number, item: Movie) {
    this.movieService.update(id, item).subscribe((res) => {
      this.messageService.show(this.messageService.msgUpdate);
    });
  }
  addNewMovie(model: MovieRequest) {
    this.movieService.create(model).subscribe((res: Movie) => {
      this.currentPageData = [res, ...this.currentPageData];
      this.hotRegisterer.getInstance(this.id).loadData(this.currentPageData);
      this.messageService.show();
    });
  }
  addRow() {
    this.addNewMovie(this.getNewRow());
  }
  getNewRow() {
    const newRow: MovieRequest = {
      budget: '0',
      originalLang: 'en',
      originalTitle: 'original title',
      overview: 'overview',
      releaseDate: new Date(),
      revenue: '0',
      runtime: '0',
      status: 'Released',
      title: 'title'
    };
    return newRow;
  }
  openModal(): void {
    const dialogRef = this.dialog.open(DailogAddMovieComponent, {
      maxHeight: '90vh',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.currentPageData = [result, ...this.currentPageData];
        this.hotRegisterer.getInstance(this.id).loadData(this.currentPageData);
      }
    });
  }
  viewDetail(id: number) {
    const dialogRef = this.dialog.open(DailogViewDetailsComponent, {
      maxHeight: '90vh',
      data: {
        movieId: id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
