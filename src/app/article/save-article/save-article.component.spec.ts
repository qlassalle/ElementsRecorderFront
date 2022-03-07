import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SaveArticleComponent} from './save-article.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestPage} from '../../shared/TestPage';
import {InMemoryArticleService} from '../service/article/in-memory-article.service';
import {Router} from '@angular/router';
import {ArticleService} from '../service/article/ArticleService';

describe('SaveArticleComponent', () => {
  let component: SaveArticleComponent;
  let fixture: ComponentFixture<SaveArticleComponent>;
  let page: TestPage<SaveArticleComponent>;
  let routerSpy;

  beforeEach(waitForAsync(() => {
    localStorage.clear();
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.stub();
    TestBed.configureTestingModule({
      declarations: [ SaveArticleComponent ],
      providers: [
        {provide: ArticleService, useValue: new InMemoryArticleService()},
        {provide: Router, useValue: routerSpy}
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
    page.testErrorMessageTriggering(TemplateConstants.URL_INPUT_ID, TemplateConstants.ERROR_DIV_ID,
      TemplateConstants.REQUIRED_URL_ID, '', false, 'URL is required.');
  });

  it('should create article when correct', async () => {
    const article = {name: 'Nebular', description: 'UI library', url: 'https://www.nebular.io', rating: '5'};
    fillAndSubmitForm(article);

    expect(getArticlesFromLocalStorage().length).toEqual(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/articles/00000000-0000-0000-0000-000000000001');
  });

  it('should display an error toast when backend fails', async () => {
    const article = {name: 'Foojay', description: 'Java blog', url: 'https://www.foojay.io', rating: '5'};
    fillAndSubmitForm(article);

    expect(page.getInput(TemplateConstants.NAME_INPUT_ID).value).toEqual(article.name);
    expect(getArticlesFromLocalStorage()).toBeNull();
    expect(page.getDiv(TemplateConstants.SERVER_ERROR_DIV_ID)).not.toBeNull();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
  });

  function fillAndSubmitForm(article: { name: string; rating: string; description: string; url: string }) {
    page.setInputAndLoseFocus(TemplateConstants.NAME_INPUT_ID, article.name);
    page.setInputAndLoseFocus(TemplateConstants.DESCRIPTION_INPUT_ID, article.description);
    page.setInputAndLoseFocus(TemplateConstants.URL_INPUT_ID, article.url);
    page.setInputAndLoseFocus(TemplateConstants.RATING_INPUT_ID, article.rating);

    page.getButton(TemplateConstants.SUBMIT_BUTTON)
        .click();
    fixture.detectChanges();
  }

  function getArticlesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('articles'));
  }

  class TemplateConstants {
    static NAME_INPUT_ID = '#name';
    static URL_INPUT_ID = '#url';
    static DESCRIPTION_INPUT_ID = '#description';
    static RATING_INPUT_ID = '#rating';
    static ERROR_DIV_ID = '#url-errors-create-article';
    static INVALID_URL_DIV_ID = '#invalid-url-create-article';
    static REQUIRED_URL_ID = '#required-url-create-article';
    static SERVER_ERROR_DIV_ID = '#server-error';
    static SUBMIT_BUTTON = '#submit';
  }
});
