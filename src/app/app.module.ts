import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ArticlesComponent} from './articles/articles.component';
import {HttpClientModule} from '@angular/common/http';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuNavbarComponent} from './menu-navbar/menu-navbar.component';
import {CreateArticleComponent} from './create-article/create-article.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationModule} from './authentication/authentication.module';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
  console.log('Token getter is called!');
  console.log(localStorage.getItem('access_token'));
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    MenuNavbarComponent,
    CreateArticleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthenticationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/authenticate/', 'http://localhost:8080/authenticate/register']
      }
    })
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
