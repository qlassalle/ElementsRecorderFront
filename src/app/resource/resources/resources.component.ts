import {Component, OnInit} from '@angular/core';
import {Resource} from '../model/Resource';
import {ResourceService} from '../service/resource/ResourceService';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources: Resource[];

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.getResources();
  }

  private getResources(): void {
    this.resourceService.getAll().subscribe(resources => {
      this.resources = resources;
    });
  }

  ratingAsStars(rating: number): number[] {
    return Array(rating);
  }

  onDelete(resourceId: string) {
    this.resources = this.resources.filter(resource => resource.id !== resourceId);
  }
}
