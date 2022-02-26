import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArticleDetailComponent} from './article-detail.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {ArticleService} from '../service/article/article.service';
import {ArticleGenerator} from '../../../tests/article/model/ArticleGenerator';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(waitForAsync(() => {
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticle']);
    articleServiceSpy.getArticle.and.returnValue(ArticleGenerator.observableOfOneArticle());
    const activatedRouteMock = {
      snapshot: {
        paramMap: convertToParamMap({id: '1'})
      }
    };
    TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: ArticleService, useValue: articleServiceSpy}
      ]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
