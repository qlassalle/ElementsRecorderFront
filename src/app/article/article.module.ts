import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleService} from './service/article/ArticleService';
import {articleServiceFactory} from './service/article/ArticleServiceFactory';
import {HttpClient} from '@angular/common/http';
import {DeleteArticleComponent} from './delete-article/delete-article.component';


@NgModule({
    declarations: [
        DeleteArticleComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DeleteArticleComponent
    ],
    providers: [
        {
            provide: ArticleService,
            useFactory: articleServiceFactory,
            deps: [HttpClient]
        }
    ]
})
export class ArticleModule { }
