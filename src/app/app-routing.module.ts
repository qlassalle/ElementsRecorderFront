import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleDetailComponent} from './article/article-detail/article-detail.component';
import {ArticlesComponent} from './article/articles/articles.component';
import {SaveArticleComponent} from './article/save-article/save-article.component';
import {AuthenticationComponent} from './authentication/authentication/authentication.component';

const routes: Routes = [
  {path: '', redirectTo: '/articles', pathMatch: 'full'},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:id', component: ArticleDetailComponent},
  {path: 'article/create', component: SaveArticleComponent},
  {path: 'register', component: AuthenticationComponent}
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
