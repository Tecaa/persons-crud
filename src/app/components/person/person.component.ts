import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RutValidator } from 'src/app/validators/rut-validator';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  readonly FORM_RUT: string = 'rut';
  readonly FORM_NAME: string = 'name';
  readonly FORM_LAST_NAME: string = 'lastName';
  readonly FORM_AGE: string = 'age';
  readonly FORM_ADDRESS: string = 'address';

  personFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private rutValidator: RutValidator) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm(): void {
    const group = {};
    group[this.FORM_RUT] = ['', [Validators.required, Validators.maxLength(11), this.rutValidator.validate]];
    group[this.FORM_NAME] = ['', [Validators.required, Validators.maxLength(50)]];
    group[this.FORM_LAST_NAME] = ['', [Validators.required, Validators.maxLength(60)]];
    group[this.FORM_AGE] = ['', [Validators.min(19)]];
    group[this.FORM_ADDRESS] = ['', [Validators.maxLength(400)]];

    this.personFormGroup = this.fb.group(group);
  }

  getControl(controlName: string) {
    return this.personFormGroup.controls[controlName];
  }
}
