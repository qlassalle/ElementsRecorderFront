import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ArticlesComponent} from './article/articles/articles.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ArticleDetailComponent} from './article/article-detail/article-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuNavbarComponent} from './menu-navbar/menu-navbar.component';
import {SaveArticleComponent} from './article/save-article/save-article.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationModule} from './authentication/authentication.module';
import {JwtModule} from '@auth0/angular-jwt';
import {ReadOnlyArticleComponent} from './article/read-only-article/read-only-article.component';
import {environment} from '../environments/environment';
import {ArticleService} from './article/service/article/ArticleService';
import {articleServiceFactory} from './article/service/article/ArticleServiceFactory';
import {ArticleModule} from './article/article.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    MenuNavbarComponent,
    SaveArticleComponent,
    ReadOnlyArticleComponent,
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
        allowedDomains: [environment.allowedDomain],
        disallowedRoutes: ['https://ozxkf3w0u6.execute-api.eu-west-3.amazonaws.com/authenticate',
          'https://ozxkf3w0u6.execute-api.eu-west-3.amazonaws.com/authenticate/register',
          'https://ozxkf3w0u6.execute-api.eu-west-3.amazonaws.com/hello'
        ]
      }
    }),
    ArticleModule,
    BrowserAnimationsModule
  ],
  providers: [
    FormBuilder,
    {
      provide: ArticleService,
      useFactory: articleServiceFactory,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
