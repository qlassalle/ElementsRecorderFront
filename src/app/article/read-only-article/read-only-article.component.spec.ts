import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ReadOnlyArticleComponent} from './read-only-article.component';
import {ArticleGenerator} from '../../../tests/article/model/ArticleGenerator';

describe('ReadOnlyArticleComponent', () => {
  let component: ReadOnlyArticleComponent;
  let fixture: ComponentFixture<ReadOnlyArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOnlyArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyArticleComponent);
    component = fixture.componentInstance;
    component.article = ArticleGenerator.oneFullArticle();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
