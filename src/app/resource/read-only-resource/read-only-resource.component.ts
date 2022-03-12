import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../model/Resource';

@Component({
  selector: 'app-read-only-resource',
  templateUrl: './read-only-resource.component.html',
  styleUrls: ['./read-only-resource.component.css']
})
export class ReadOnlyResourceComponent implements OnInit {

  @Input()
  resource: Resource;

  constructor() { }

  ngOnInit(): void {
  }

  ratingAsStars(): number[] {
    return Array(this.resource.rating);
  }
}
