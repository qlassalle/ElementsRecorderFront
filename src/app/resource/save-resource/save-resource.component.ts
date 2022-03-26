import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Resource} from '../model/Resource';
import {SharedConstants} from '../../shared/shared.constants';
import {Router} from '@angular/router';
import {ResourceService} from '../service/resource/ResourceService';

@Component({
  selector: 'app-save-resource',
  templateUrl: './save-resource.component.html',
  styleUrls: ['./save-resource.component.css']
})
export class SaveResourceComponent implements OnInit {

  @Input()
  resource: Resource;
  @Input()
  editMode: boolean;
  @Output()
  hasSavedChanges = new EventEmitter<Resource>();
  resourceForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private resourceService: ResourceService, private router: Router) {
    this.resourceForm = this.formBuilder.group({
      name: '',
      description: '',
      url: ['', [Validators.required, Validators.pattern(SharedConstants.URL_REGEX)]],
      rating: '',
      tags: new FormGroup({
        tags: new FormControl(''),
        selectedTags: new FormControl('')
      })
    });
  }

  ngOnInit(): void {
    if (this.resource != null) {
      this.resourceForm.patchValue(this.resource);
    }
  }

  onSubmit(formValue: any) {
    if (this.resource == null) {
      formValue.tags = formValue.tags.selectedTags;
      this.resourceService.create(formValue).subscribe((created: Resource) => {
        this.router.navigateByUrl('/resources/' + created.id);
      }, (error) => {
        this.resourceForm.setErrors({serverError: error.error.message});
      });
    } else {
      this.resourceService.update(this.resource.id, formValue).subscribe({
        next: (resource: Resource) => {
          this.hasSavedChanges.emit(resource);
        }
      });
    }
  }

  get url() {
    return this.resourceForm.get('url');
  }
}
