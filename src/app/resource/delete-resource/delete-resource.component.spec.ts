import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteResourceComponent} from './delete-resource.component';
import {InMemoryResourceService} from '../service/resource/in-memory-resource.service';
import {ResourceService} from '../service/resource/ResourceService';
import {ResourceGenerator} from '../../../tests/resource/model/ResourceGenerator';
import {Resource} from '../model/Resource';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarStub} from '../../shared/MatSnackBarStub';

describe('DeleteResourceComponent', () => {
  let component: DeleteResourceComponent;
  let fixture: ComponentFixture<DeleteResourceComponent>;
  const resourceService: InMemoryResourceService = new InMemoryResourceService();
  const resourceGenerator: ResourceGenerator = new ResourceGenerator();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteResourceComponent ],
      providers: [
        { provide: ResourceService, useValue: resourceService},
        { provide: MatSnackBar, useClass: MatSnackBarStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    resourceService.feed(resourceGenerator.oneResourceAsArray());
    fixture = TestBed.createComponent(DeleteResourceComponent);
    component = fixture.componentInstance;
    resourceGenerator.observableOfOneResource().subscribe((resource: Resource) => component.resource = resource);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete resource when confirming', async () => {
    expect(resourceService.resources.length).toEqual(1);
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.snackBar, 'open').and.callThrough();
    component.delete();
    expect(component.snackBar.open).toHaveBeenCalled();
    expect(resourceService.resources.length).toEqual(0);
  });

  it('should not delete resource when canceling', () => {
    expect(resourceService.resources.length).toEqual(1);
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.snackBar, 'open').and.callThrough();
    component.delete();
    expect(component.snackBar.open).not.toHaveBeenCalled();
    expect(resourceService.resources.length).toEqual(1);
  });
});
