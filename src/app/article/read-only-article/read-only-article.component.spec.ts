import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ReadOnlyArticleComponent} from './read-only-article.component';
import {ArticleGenerator} from '../../../tests/article/model/ArticleGenerator';
import {Article} from '../model/Article';

describe('ReadOnlyArticleComponent', () => {
  let component: ReadOnlyArticleComponent;
  let fixture: ComponentFixture<ReadOnlyArticleComponent>;
  const articleGenerator: ArticleGenerator = new ArticleGenerator();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOnlyArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyArticleComponent);
    component = fixture.componentInstance;
    articleGenerator.observableOfOneArticle().subscribe((article: Article) => component.article = article);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
