import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SaveResourceComponent} from './save-resource.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestPage} from '../../shared/TestPage';
import {InMemoryResourceService} from '../service/resource/in-memory-resource.service';
import {Router} from '@angular/router';
import {ResourceService} from '../service/resource/ResourceService';
import {TagModule} from '../../tag/tag.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TagService} from '../../tag/service/TagService';
import {InMemoryTagService} from '../../tag/service/in-memory-tag.service';

describe('SaveResourceComponent', () => {
  const inMemoryResourceService = new InMemoryResourceService();
  const inMemoryTagService = new InMemoryTagService();
  let component: SaveResourceComponent;
  let fixture: ComponentFixture<SaveResourceComponent>;
  let page: TestPage<SaveResourceComponent>;
  let routerSpy;

  beforeEach(waitForAsync(() => {
    inMemoryResourceService.clear();
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.stub();
    TestBed.configureTestingModule({
      declarations: [SaveResourceComponent],
      providers: [
        {provide: ResourceService, useValue: inMemoryResourceService},
        {provide: TagService, useValue: inMemoryTagService},
        {provide: Router, useValue: routerSpy}
      ],
      imports: [ReactiveFormsModule, FormsModule, TagModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveResourceComponent);
    component = fixture.componentInstance;
    page = new TestPage<SaveResourceComponent>(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages when resource url is invalid', async () => {
    page.testErrorMessageTriggering(TemplateConstants.URL_INPUT_ID, TemplateConstants.ERROR_DIV_ID,
      TemplateConstants.INVALID_URL_DIV_ID, 'cibrary', false, 'Please provide a valid url.');
  });

  it('should display error message when url input has been touched but is still empty', async () => {
    page.testErrorMessageTriggering(TemplateConstants.URL_INPUT_ID, TemplateConstants.ERROR_DIV_ID,
      TemplateConstants.REQUIRED_URL_ID, '', false, 'URL is required.');
  });

  it('should create resource when correct', async () => {
    const resource = {name: 'Nebular', description: 'UI library', url: 'https://www.nebular.io', rating: '5'};
    fillAndSubmitForm(resource);

    expect(getResourcesFromLocalStorage().length).toEqual(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/resources/00000000-0000-0000-0000-000000000001');
  });

  it('should create resource with tags when correct', async () => {
    const resource = {
      name: 'Angular',
      description: 'Front-end framework',
      url: 'https://www.angular.io',
      rating: '5',
      tags: ['front', 'programming']
    };
    spyOn(inMemoryResourceService, 'create').and.callThrough();
    fillAndSubmitForm(resource);

    // validate transformation from comma separated tags to tag array
    expect(inMemoryResourceService.create).toHaveBeenCalledWith(resource);
    expect(getResourcesFromLocalStorage().length).toEqual(1);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/resources/00000000-0000-0000-0000-000000000001');
  });


  it('should display an error toast when backend fails', async () => {
    const resource = {name: 'Foojay', description: 'Java blog', url: 'https://www.foojay.io', rating: '5'};
    fillAndSubmitForm(resource);

    expect(page.getInput(TemplateConstants.NAME_INPUT_ID).value).toEqual(resource.name);
    expect(getResourcesFromLocalStorage()).toBeNull();
    expect(page.getDiv(TemplateConstants.SERVER_ERROR_DIV_ID)).not.toBeNull();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(0);
  });

  function fillAndSubmitForm(resource: { name: string; rating: string; description: string; url: string, tags?: string[]}) {
    page.setInputAndLoseFocus(TemplateConstants.NAME_INPUT_ID, resource.name);
    page.setInputAndLoseFocus(TemplateConstants.DESCRIPTION_INPUT_ID, resource.description);
    page.setInputAndLoseFocus(TemplateConstants.URL_INPUT_ID, resource.url);
    page.setInputAndLoseFocus(TemplateConstants.RATING_INPUT_ID, resource.rating);
    resource.tags.forEach(tag => {
      addTag(tag);
    });

    page.getButton(TemplateConstants.SUBMIT_BUTTON).click();
    fixture.detectChanges();
  }

  function addTag(tag: string) {
    page.setInputAndLoseFocus('#tags', tag);
    const input = page.getInput('#tags');
    input.dispatchEvent(new Event('focus'));
    input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    fixture.detectChanges();
  }


  function getResourcesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('resources'));
  }

  class TemplateConstants {
    static NAME_INPUT_ID = '#name';
    static URL_INPUT_ID = '#url';
    static DESCRIPTION_INPUT_ID = '#description';
    static RATING_INPUT_ID = '#rating';
    static TAGS_INPUT_ID = '#selected-tags';
    static ERROR_DIV_ID = '#url-errors-create-resource';
    static INVALID_URL_DIV_ID = '#invalid-url-create-resource';
    static REQUIRED_URL_ID = '#required-url-create-resource';
    static SERVER_ERROR_DIV_ID = '#server-error';
    static SUBMIT_BUTTON = '#submit';
  }
});
