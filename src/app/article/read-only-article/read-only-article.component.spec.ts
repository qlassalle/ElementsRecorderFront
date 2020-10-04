import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadOnlyArticleComponent} from './read-only-article.component';

describe('ReadOnlyArticleComponent', () => {
  let component: ReadOnlyArticleComponent;
  let fixture: ComponentFixture<ReadOnlyArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOnlyArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
