import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArticlesComponent} from './articles.component';
import {ArticleService} from '../service/article/article.service';
import {ArticleGenerator} from '../../../tests/article/model/ArticleGenerator';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(waitForAsync(() => {
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles']);
    articleServiceSpy.getArticles.and.returnValue(ArticleGenerator.observableOfOneArticleAsArray());
    TestBed.configureTestingModule({
      declarations: [ ArticlesComponent ],
      providers: [{provide: ArticleService, useValue: articleServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
