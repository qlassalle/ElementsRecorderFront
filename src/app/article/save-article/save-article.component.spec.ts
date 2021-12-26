import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SaveArticleComponent} from './save-article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArticleService} from '../service/article/article.service';
import {TestPage} from '../../shared/TestPage';

describe('SaveArticleComponent', () => {
  let component: SaveArticleComponent;
  let fixture: ComponentFixture<SaveArticleComponent>;
  let articleServiceSpy;
  let page: TestPage<SaveArticleComponent>;

  beforeEach(waitForAsync(() => {
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['create', 'update']);
    TestBed.configureTestingModule({
      declarations: [ SaveArticleComponent ],
      providers: [
        {provide: ArticleService, useValue: articleServiceSpy}
      ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveArticleComponent);
    component = fixture.componentInstance;
    page = new TestPage<SaveArticleComponent>(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages when article url is invalid', async () => {
    page.testErrorMessageTriggering(TemplateConstants.URL_INPUT_ID, TemplateConstants.ERROR_DIV_ID,
      TemplateConstants.INVALID_URL_DIV_ID, 'cibrary', false, 'Please provide a valid url.');
  });

  it('should display error message when url input has been touched but is still empty', async () => {
    // page.setInputAndLoseFocus(TemplateConstants.URL_INPUT_IDENTIFIER, '');
    page.testErrorMessageTriggering(TemplateConstants.URL_INPUT_ID, TemplateConstants.ERROR_DIV_ID,
      TemplateConstants.REQUIRED_URL_ID, '' , false, 'URL is required.');
  });

  class TemplateConstants {
    static URL_INPUT_ID = '#url';
    static ERROR_DIV_ID = '#url-errors-create-article';
    static INVALID_URL_DIV_ID = '#invalid-url-create-article';
    static REQUIRED_URL_ID = '#required-url-create-article';
  }
});
