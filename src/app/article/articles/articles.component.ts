import {Component, OnInit} from '@angular/core';
import {Article} from '../model/Article';
import {ArticleService} from '../service/article/ArticleService';

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
    this.articleService.getAll().subscribe(articles => {
      this.articles = articles;
    });
  }

  ratingAsStars(rating: number): number[] {
    return Array(rating);
  }

  onDelete(articleId: string) {
    this.articles = this.articles.filter(article => article.id !== articleId);
  }
}
