import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ResourceDetailComponent} from './resource-detail.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {InMemoryResourceService} from '../service/resource/in-memory-resource.service';
import {ResourceService} from '../service/resource/ResourceService';

describe('ResourceDetailComponent', () => {
  let component: ResourceDetailComponent;
  let fixture: ComponentFixture<ResourceDetailComponent>;

  beforeEach(waitForAsync(() => {
    const activatedRouteMock = {
      snapshot: {
        paramMap: convertToParamMap({id: '1'})
      }
    };
    TestBed.configureTestingModule({
      declarations: [ResourceDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: ResourceService, useValue: new InMemoryResourceService()}
      ]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
