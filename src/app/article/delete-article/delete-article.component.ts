import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../model/Article';
import {ArticleService} from '../service/article/ArticleService';

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

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  delete(id: string): void {
    // use observable to handle failure here
    this.articleService.delete(id);
    this.hasBeenDeleted.emit(id);
  }
}
