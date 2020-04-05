import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticlesComponent} from './articles/articles.component';
import {CreateArticleComponent} from './create-article/create-article.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full'},
  { path: 'articles', component: ArticlesComponent},
  { path: 'articles/:id', component: ArticleDetailComponent},
  { path: 'article/create', component: CreateArticleComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
