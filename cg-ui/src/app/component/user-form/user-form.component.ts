import { Component, OnInit } from '@angular/core';
import {EventProviderService} from '../../service/event/event-provider.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../service/rest/rest.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  complexForm: FormGroup;
  subjectFc: FormControl;
  propertyFc: FormControl;
  objectFc: FormControl;
  verbalizeFc: FormControl;

  public showBar = false;


  constructor(public eventService: EventProviderService, public restService: RestService, fb: FormBuilder) {
    this.subjectFc = new FormControl('http://dbpedia.org/resource/Barack_Obama', Validators.required);
    this.propertyFc = new FormControl('http://dbpedia.org/ontology/nationality', Validators.required);
    this.objectFc = new FormControl('http://dbpedia.org/resource/United_States', Validators.required);
    this.verbalizeFc =  new FormControl(false);
    this.complexForm = fb.group({
      'subject' : this.subjectFc,
      'property': this.propertyFc,
      'object' : this.objectFc,
      'verbalize' : this.verbalizeFc
    });
  }

  ngOnInit() {
    this.restService.requestEvnt.subscribe(val => { this.toggleProgressBar(val); });
  }
  toggleProgressBar(showBar) {
    this.showBar = showBar;
  }

  showGraph() {
    this.eventService.viewChangeEvent.emit( true );
  }

  submitForm(value: any): void {
    this.restService.getRequest('validate', value).subscribe((jsonVal) => {
      console.log(jsonVal);
      this.eventService.updateDataEvent.emit(jsonVal);
      this.eventService.viewChangeEvent.emit( true );
    });
  }

}
