import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ResourcesComponent} from './resources.component';
import {InMemoryResourceService} from '../service/resource/in-memory-resource.service';
import {ResourceService} from '../service/resource/ResourceService';
import {ResourceGenerator} from '../../../tests/resource/model/ResourceGenerator';
import {TestPage} from '../../shared/TestPage';
import {DeleteResourceComponent} from '../delete-resource/delete-resource.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarStub} from '../../shared/MatSnackBarStub';

describe('ResourcesComponent', () => {
  const resourceGenerator: ResourceGenerator = new ResourceGenerator();
  const resourceService: InMemoryResourceService = new InMemoryResourceService();
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;
  let page: TestPage<ResourcesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesComponent, DeleteResourceComponent],
      providers: [
        {provide: ResourceService, useValue: resourceService},
        {provide: MatSnackBar, useClass: MatSnackBarStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    resourceService.feed(resourceGenerator.oneResourceAsArray());
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    page = new TestPage<ResourcesComponent>(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete resource', () => {
    expect(resourceService.resources.length).toEqual(1);
    expect(component.resources.length).toEqual(1);

    spyOn(window, 'confirm').and.returnValue(true);
    page.getButton('#delete-resource-' + resourceGenerator.oneResource().id).click();
    fixture.detectChanges();

    expect(resourceService.resources.length).toEqual(0);
    expect(component.resources.length).toEqual(0);
  });
});
