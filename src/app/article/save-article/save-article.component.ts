import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ArticleService} from '../service/article/article.service';
import {Article} from '../model/Article';

@Component({
  selector: 'app-save-article',
  templateUrl: './save-article.component.html',
  styleUrls: ['./save-article.component.css']
})
export class SaveArticleComponent implements OnInit {

  @Input()
  article: Article;
  @Input()
  editMode: boolean;
  @Output()
  hasSavedChanges = new EventEmitter<Article>();
  articleForm;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.formBuilder.group({
      name: '',
      description: '',
      url: '',
      rating: ''
    });
  }

  ngOnInit(): void {
    if (this.article != null) {
      this.articleForm.patchValue(this.article);
    }
  }

  onSubmit(formValue: any) {
    this.articleForm.reset();
    if (this.article == null) {
      this.articleService.create(formValue).subscribe();
    } else {
      this.articleService.update(this.article.id, formValue).subscribe({
        next: (article: Article) => {
          this.hasSavedChanges.emit(article);
        }
      });
    }
  }
}
