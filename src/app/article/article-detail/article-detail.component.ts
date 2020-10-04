import {Component, OnInit} from '@angular/core';
import {Article} from '../model/Article';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../service/article/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article;
  editMode = false;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticle();
  }

  private getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id).subscribe(article => this.article = article);
  }

  switchToEditMode() {
    this.editMode = !this.editMode;
  }

  onSave(article: Article) {
    this.editMode = !this.editMode;
    this.article = article;
  }
}
