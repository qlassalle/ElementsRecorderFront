import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../model/Article';
import {ArticleService} from '../service/article/ArticleService';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.css']
})
export class DeleteArticleComponent implements OnInit {

  @Input()
  article: Article;

  @Output()
  hasBeenDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private articleService: ArticleService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  delete(): void {
    if (window.confirm('Do you really want to delete the resource ' + this.article.name + '?')) {
      // use observable to handle failure here
      this.articleService.delete(this.article.id);
      this.snackBar.open('Your resource has been deleted', 'OK');
      this.hasBeenDeleted.emit(this.article.id);
    }
  }
}
