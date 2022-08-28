import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceFilterComponent} from './resource-filter.component';

describe('ResourceFilterComponent', () => {
  let component: ResourceFilterComponent;
  let fixture: ComponentFixture<ResourceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should sort resources by rating', () => {
    component.resources = initResources();
    const expectedRating = [5, 4, 2];
    component.sortByRating();
    expect(component.resources.map(resource => resource.rating)).toEqual(expectedRating);
  });

  it('should sort resources by rating with null values', () => {
    const resources = initResources();
    resources[0].rating = null;
    component.resources = resources;
    const expectedRating = [5, 4, null];
    component.sortByRating();
    expect(component.resources.map(resource => resource.rating)).toEqual(expectedRating);
  });


  function initResources() {
    return [{
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Foojay',
      description: 'Java website',
      rating: 2,
      url: 'https://www.foojay.com',
      tags: [{id: '123', name: 'Java'}],
      created_at: '2022-08-22T20:22:33.301528Z',
      updated_at: '2022-08-22T20:22:33.301528Z'
    }, {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'System Design Primer',
        description: 'Github on SD',
        rating: 5,
        url: 'https://www.github/sd.com',
        tags: [{id: '456', name: 'System Design'}],
        created_at: '2022-08-22T20:22:33.301528Z',
        updated_at: '2022-08-22T20:22:33.301528Z'
      }, {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Nebular',
        description: 'Angular UI lib',
        rating: 4,
        url: 'https://www.nebular.io',
        tags: [{id: '789', name: 'Angular'}],
        created_at: '2022-08-22T20:22:33.301528Z',
        updated_at: '2022-08-22T20:22:33.301528Z'
      }];
  }
});
