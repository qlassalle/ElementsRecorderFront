import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../model/Article';

@Component({
  selector: 'app-read-only-article',
  templateUrl: './read-only-article.component.html',
  styleUrls: ['./read-only-article.component.css']
})
export class ReadOnlyArticleComponent implements OnInit {

  @Input()
  article: Article;

  constructor() { }

  ngOnInit(): void {
  }

  ratingAsStars(): number[] {
    return Array(this.article.rating);
  }
}
