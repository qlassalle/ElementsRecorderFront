import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteArticleComponent} from './delete-article.component';
import {InMemoryArticleService} from '../service/article/in-memory-article.service';
import {ArticleService} from '../service/article/ArticleService';
import {ArticleGenerator} from '../../../tests/article/model/ArticleGenerator';
import {Article} from '../model/Article';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarStub} from '../../shared/MatSnackBarStub';

describe('DeleteArticleComponent', () => {
  let component: DeleteArticleComponent;
  let fixture: ComponentFixture<DeleteArticleComponent>;
  const articleService: InMemoryArticleService = new InMemoryArticleService();
  const articleGenerator: ArticleGenerator = new ArticleGenerator();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteArticleComponent ],
      providers: [
        { provide: ArticleService, useValue: articleService},
        { provide: MatSnackBar, useClass: MatSnackBarStub}
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

  it('should delete article when confirming', async () => {
    expect(articleService.articles.length).toEqual(1);
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.snackBar, 'open').and.callThrough();
    component.delete();
    expect(component.snackBar.open).toHaveBeenCalled();
    expect(articleService.articles.length).toEqual(0);
  });

  it('should not delete article when canceling', () => {
    expect(articleService.articles.length).toEqual(1);
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.snackBar, 'open').and.callThrough();
    component.delete();
    expect(component.snackBar.open).not.toHaveBeenCalled();
    expect(articleService.articles.length).toEqual(1);
  });
});
