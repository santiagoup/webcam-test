import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebcamComponent } from './components/webcam/webcam.component';

const routes: Routes = [
  {
    path: 'main',
    component: WebcamComponent,
    data: {pageTitle: 'Home'},
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
