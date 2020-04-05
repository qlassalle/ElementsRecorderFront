import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ArticlesComponent} from './articles/articles.component';
import {HttpClientModule} from '@angular/common/http';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    MenuNavbarComponent,
    CreateArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
