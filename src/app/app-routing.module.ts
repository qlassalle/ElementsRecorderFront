import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticlesComponent} from './articles/articles.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {RegistrationComponent} from './authentication/registration/registration.component';
import {AuthenticationComponent} from './authentication/authentication/authentication.component';

const routes: Routes = [
  {path: '', redirectTo: '/articles', pathMatch: 'full'},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:id', component: ArticleDetailComponent},
  {path: 'article/create', component: CreateArticleComponent},
  {path: 'register', component: AuthenticationComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
