import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArticlesComponent} from './articles.component';
import {InMemoryArticleService} from '../service/article/in-memory-article.service';
import {ArticleService} from '../service/article/ArticleService';
import {ArticleGenerator} from '../../../tests/article/model/ArticleGenerator';
import {TestPage} from '../../shared/TestPage';

describe('ArticlesComponent', () => {
  const articleGenerator: ArticleGenerator = new ArticleGenerator();
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let page: TestPage<ArticlesComponent>;
  const articleService: InMemoryArticleService = new InMemoryArticleService();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesComponent],
      providers: [{provide: ArticleService, useValue: articleService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    articleService.feed(articleGenerator.oneArticleAsArray());
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    page = new TestPage<ArticlesComponent>(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete article - component only', () => {
    expect(articleService.articles.length).toEqual(1);
    component.delete(articleGenerator.oneArticle().id);
    expect(articleService.articles.length).toEqual(0);
  });

  it('should delete article from DOM', () => {
    expect(articleService.articles.length).toEqual(1);

    page.getButton('#delete-article-' + articleGenerator.oneArticle().id).click();
    fixture.detectChanges();

    expect(articleService.articles.length).toEqual(0);
  });
});
