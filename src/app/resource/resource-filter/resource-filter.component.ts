import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../model/Resource';

@Component({
  selector: 'app-resource-filter',
  templateUrl: './resource-filter.component.html',
  styleUrls: ['./resource-filter.component.css']
})
export class ResourceFilterComponent implements OnInit {

  private descending = false;

  @Input()
  resources: Resource[];

  constructor() { }

  ngOnInit(): void {
    this.sortByRating();
  }

  sortByRating() {
    this.resources.sort((a, b) => {
      return a.rating > b.rating ? -1 : 1;
    });
    if (!this.descending) {
      this.resources.reverse();
    }
    this.descending = !this.descending;
  }
}
