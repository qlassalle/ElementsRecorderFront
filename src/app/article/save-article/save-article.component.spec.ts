import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SaveArticleComponent} from './save-article.component';
import {FormBuilder} from '@angular/forms';
import {ArticleService} from '../service/article/article.service';

describe('SaveArticleComponent', () => {
  let component: SaveArticleComponent;
  let fixture: ComponentFixture<SaveArticleComponent>;

  beforeEach(waitForAsync(() => {
    const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    formBuilderSpy.group.and.returnValue({name: '', description: '', url: '', rating: ''});
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', ['create', 'update']);
    TestBed.configureTestingModule({
      declarations: [ SaveArticleComponent ],
      providers: [
        {provide: FormBuilder, useValue: formBuilderSpy},
        {provide: ArticleService, useValue: articleServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
