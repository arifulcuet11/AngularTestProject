import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movie',
  },
  {
    path: 'movie',
    loadChildren: () => import('../app/movies/movie.module').then(m => m.MovieModule),
  },
  { path: '**', redirectTo: '/movie' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
