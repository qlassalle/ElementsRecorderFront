import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ReadOnlyResourceComponent} from './read-only-resource.component';
import {ResourceGenerator} from '../../../tests/resource/model/ResourceGenerator';
import {Resource} from '../model/Resource';

describe('ReadOnlyResourceComponent', () => {
  let component: ReadOnlyResourceComponent;
  let fixture: ComponentFixture<ReadOnlyResourceComponent>;
  const resourceGenerator: ResourceGenerator = new ResourceGenerator();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOnlyResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyResourceComponent);
    component = fixture.componentInstance;
    resourceGenerator.observableOfOneResource().subscribe((resource: Resource) => component.resource = resource);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
