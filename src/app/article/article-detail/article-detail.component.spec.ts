import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArticleDetailComponent} from './article-detail.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {HttpArticleService} from '../service/article/http-article.service';
import {InMemoryArticleService} from '../service/article/in-memory-article.service';
import {ArticleService} from '../service/article/ArticleService';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  beforeEach(waitForAsync(() => {
    const activatedRouteMock = {
      snapshot: {
        paramMap: convertToParamMap({id: '1'})
      }
    };
    TestBed.configureTestingModule({
      declarations: [ArticleDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: ArticleService, useValue: new InMemoryArticleService()}
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
