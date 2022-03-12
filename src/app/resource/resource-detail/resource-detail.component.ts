import {Component, OnInit} from '@angular/core';
import {Resource} from '../model/Resource';
import {ActivatedRoute} from '@angular/router';
import {ResourceService} from '../service/resource/ResourceService';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {

  resource: Resource;
  editMode = false;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.getResource();
  }

  private getResource(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.resourceService.get(id).subscribe(resource => this.resource = resource);
  }

  switchToEditMode() {
    this.editMode = !this.editMode;
  }

  onSave(resource: Resource) {
    this.editMode = !this.editMode;
    this.resource = resource;
  }
}
