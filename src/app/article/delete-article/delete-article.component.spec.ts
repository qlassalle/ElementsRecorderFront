import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteArticleComponent} from './delete-article.component';
import {InMemoryArticleService} from '../service/article/in-memory-article.service';
import {ArticleService} from '../service/article/ArticleService';
import {ArticleGenerator} from '../../../tests/article/model/ArticleGenerator';
import {Article} from '../model/Article';

describe('DeleteArticleComponent', () => {
  let component: DeleteArticleComponent;
  let fixture: ComponentFixture<DeleteArticleComponent>;
  const articleService: InMemoryArticleService = new InMemoryArticleService();
  const articleGenerator: ArticleGenerator = new ArticleGenerator();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteArticleComponent ],
      providers: [
        { provide: ArticleService, useValue: articleService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    articleService.feed(articleGenerator.oneArticleAsArray());
    fixture = TestBed.createComponent(DeleteArticleComponent);
    component = fixture.componentInstance;
    articleGenerator.observableOfOneArticle().subscribe((article: Article) => component.article = article);
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
});
