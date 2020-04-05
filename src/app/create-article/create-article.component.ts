import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ArticleService} from '../article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  articleForm;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.formBuilder.group({
      name: '',
      description: '',
      rating: 0
    });
  }

  ngOnInit(): void {
  }

  onSubmit(articleData) {
    this.articleForm.reset();
    this.articleService.create(articleData).subscribe();
  }
}
