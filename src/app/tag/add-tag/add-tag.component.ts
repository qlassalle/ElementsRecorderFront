import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TagService} from '../service/TagService';
import {Tag} from '../model/Tag';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  @Input()
  tags: FormGroup;
  userTags: Tag[];
  filteredOptions: Observable<Tag[]>;
  selectedTags: string[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService
        .getAll()
        .subscribe(tags => {
          this.userTags = tags;
        });
    this.filteredOptions = this.tags.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: any): Tag[] {
    return this.userTags.filter(tag => tag.name.includes(value.tags));
  }

  selectTag(tag: string) {
    if (tag === null) {
      return;
    }
    this.selectedTags.push(tag);
    this.userTags = this.userTags.filter(userTag => userTag.name !== tag);
    this.tags.get('tags').reset();
    this.tags.get('selectedTags').setValue(this.selectedTags);
  }

  keyupInput($event: any) {
    this.selectTag(this.tags.value.tags);
    $event.preventDefault();
  }
}
