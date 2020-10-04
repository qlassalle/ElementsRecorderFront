import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveArticleComponent } from './save-article.component';

describe('CreateArticleComponent', () => {
  let component: SaveArticleComponent;
  let fixture: ComponentFixture<SaveArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveArticleComponent ]
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
