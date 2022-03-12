import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleService} from './service/article/ArticleService';
import {articleServiceFactory} from './service/article/ArticleServiceFactory';
import {HttpClient} from '@angular/common/http';
import {DeleteArticleComponent} from './delete-article/delete-article.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    DeleteArticleComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  exports: [
    DeleteArticleComponent
  ],
  providers: [
    {
      provide: ArticleService,
      useFactory: articleServiceFactory,
      deps: [HttpClient]
    },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})
export class ArticleModule {
}
