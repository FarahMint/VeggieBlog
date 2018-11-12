import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsDashboardComponent } from './posts-dashboard/posts-dashboard.component';
import { PostsDetailComponent } from './posts-detail/posts-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'blog',
    component: PostsListComponent
  },
  {
    path: 'blog/:id',
    component: PostsDetailComponent
  },
  {
    path: 'dashboard',
    component: PostsDashboardComponent
  }
];
// RouterModule.forRoot(routes)
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    PostsDashboardComponent,
    PostsDetailComponent,
    PostsListComponent
  ],
  exports: [RouterModule]
})
export class PostsModule {}
