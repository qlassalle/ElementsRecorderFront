import { Component, OnInit } from '@angular/core';
import {Article} from '../model/Article';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  private getArticles(): void {
    this.articleService.getArticles().subscribe(articles => this.articles = articles);
  }
}
