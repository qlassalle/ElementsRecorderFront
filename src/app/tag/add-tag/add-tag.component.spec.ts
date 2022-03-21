import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddTagComponent} from './add-tag.component';
import {TagService} from '../service/TagService';
import {InMemoryTagService} from '../service/in-memory-tag.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestPage} from '../../shared/TestPage';

describe('AddTagComponent', () => {
  const inMemoryTagService = new InMemoryTagService();
  let component: AddTagComponent;
  let fixture: ComponentFixture<AddTagComponent>;
  let page: TestPage<AddTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTagComponent],
      providers: [
        {provide: TagService, useValue: inMemoryTagService}
      ],
      imports: [
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    inMemoryTagService.feed([{id: '1', name: 'Hello'}, {id: '2', name: 'Hell'}, {id: '3', name: 'Bernard'}]);
    fixture = TestBed.createComponent(AddTagComponent);
    component = fixture.componentInstance;
    component.tags = new FormGroup({tags: new FormControl(''), selectedTags: new FormControl('')});
    page = new TestPage<AddTagComponent>(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  function addTag(tag: string) {
    page.setInputAndLoseFocus('#tags', tag);
    const input = page.getInput('#tags');
    input.dispatchEvent(new Event('focus'));
    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    fixture.detectChanges();
  }

  it('should add tags not present in autocomplete and set it as selected tags', async () => {
    addTag('Bonjour');
    expect(component.selectedTags.length).toEqual(1);
    expect(component.userTags.length).toEqual(3);
  });

  it('should add tags present in autocomplete and set it as selected tags', async () => {
    addTag('Hello');
    addTag('Bernard');
    expect(component.selectedTags.length).toEqual(2);
    expect(component.userTags.length).toEqual(1);
  });

  it('should add all tags present in autocomplete and a new one and set it as selected tags', async () => {
    addTag('Hello');
    addTag('Bernard');
    addTag('Hell');
    addTag('Hola');
    expect(component.selectedTags.length).toEqual(4);
    expect(component.userTags.length).toEqual(0);
  });


  it('should allow to add tag, remove it and put it back in the suggested list of tags', async () => {
    // TODO implement test
    expect(1).toEqual(1);
  });
});
