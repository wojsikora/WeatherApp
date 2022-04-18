import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from '../components/results/results.component';
import { SearchComponent } from '../components/search/search.component';

 const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'result', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
