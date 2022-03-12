import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Resource} from '../model/Resource';
import {ResourceService} from '../service/resource/ResourceService';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-resource',
  templateUrl: './delete-resource.component.html',
  styleUrls: ['./delete-resource.component.css']
})
export class DeleteResourceComponent implements OnInit {

  @Input()
  resource: Resource;

  @Output()
  hasBeenDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private resourceService: ResourceService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  delete(): void {
    if (window.confirm('Do you really want to delete the resource ' + this.resource.name + '?')) {
      // use observable to handle failure here
      this.resourceService.delete(this.resource.id);
      this.snackBar.open('Your resource has been deleted', 'OK');
      this.hasBeenDeleted.emit(this.resource.id);
    }
  }
}
