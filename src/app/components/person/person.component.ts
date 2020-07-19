import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { RutValidator } from 'src/app/validators/rut-validator';
import { Person } from '../../classes/person';
import { FormUtils } from 'src/app/utils/form.utils';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewPersonRequest } from '../../api/model/newPersonRequest';
import { PersonMapperService } from '../../services/mappers/person-mapper.service';
import { PersonService } from '../../api/api/person.service';
import { ComponentMode } from 'src/app/enums/component-mode.enum';
import { MessageService } from 'primeng/api';
import { PersonDto } from '../../api/model/personDto';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  private INVALID_FORM_MESSAGE: string;
  private SERVER_ERROR_MESSAGE: string;

  readonly FORM_RUT: string = 'rut';
  readonly FORM_NAME: string = 'name';
  readonly FORM_LAST_NAME: string = 'lastName';
  readonly FORM_AGE: string = 'age';
  readonly FORM_ADDRESS: string = 'address';

  readonly RUT_MAX_LENGTH: number = 11;
  readonly NAME_MAX_LENGTH: number = 50;
  readonly LAST_NAME_MAX_LENGTH: number = 60;
  readonly ADDRESS_MAX_LENGTH: number = 400;

  readonly AGE_MIN_VALUE: number = 19;
  readonly AGE_MAX_VALUE: number = 150;


  personFormGroup: FormGroup;
  public ComponentModeEnum = ComponentMode;
  public componentMode: ComponentMode;
  public errorFetchingData: boolean;
  public invalidForm: boolean;

  private personId: number;
  private person: Person;

  constructor(private fb: FormBuilder, private messageService: MessageService,
              private translate: TranslateService, private activatedRoute: ActivatedRoute,
              private router: Router, private personMapperService: PersonMapperService,
              private personService: PersonService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async params => {
      const paramId = params.id;
      this.personId = paramId ? parseInt(paramId, 10) : null;

      try {
        this.componentMode = this.readComponentMode(paramId);
      }
      catch {
          this.goOut();
          return;
      }

      await this.fetchData();
      this.buildForm();
      await this.getStrings();
      this.setData();
    });
  }

  async fetchData(): Promise<void> {
    if (this.person){
      return;
    }

    if (this.componentMode !== ComponentMode.Update){
      return;
    }

    const personDto = await this.personService.idGet(this.personId).toPromise()
      .catch(e => {
        this.errorFetchingData = true;
        return this.showServerErrorMessage(e);
    });
    if (!personDto.error){
      this.person = this.personMapperService.toPerson(personDto);
    }
    else{
      this.personFormGroup.disable();
    }
  }

  setData(): any {
    if (!this.person || !this.personFormGroup){
      return;
    }
    const group = {};
    group[this.FORM_NAME] = this.person.name;
    group[this.FORM_LAST_NAME] = this.person.lastName;
    group[this.FORM_RUT] = this.person.rut + '-' + this.person.vd;
    group[this.FORM_AGE] = this.person.age;
    group[this.FORM_ADDRESS] = this.person.address;

    this.personFormGroup.patchValue(group);
  }


  readComponentMode(id: number): ComponentMode {
    return id ? ComponentMode.Update : ComponentMode.Create;
  }

  private goOut(){
    this.router.navigate(['']);
  }


  private async getStrings(): Promise<void> {
    this.INVALID_FORM_MESSAGE = await this.translate.get('error.form.invalid').toPromise();
    this.SERVER_ERROR_MESSAGE = await this.translate.get('error.form.serverError').toPromise();
  }


  buildForm(): void {
    const group = {};
    group[this.FORM_RUT] = ['', [Validators.required, Validators.maxLength(this.RUT_MAX_LENGTH), RutValidator.validate]];
    group[this.FORM_NAME] = ['', [Validators.required, Validators.maxLength(this.NAME_MAX_LENGTH)]];
    group[this.FORM_LAST_NAME] = ['', [Validators.required, Validators.maxLength(this.LAST_NAME_MAX_LENGTH)]];
    group[this.FORM_AGE] = ['', [Validators.min(this.AGE_MIN_VALUE), Validators.max(this.AGE_MAX_VALUE), Validators.pattern('^[0-9]+$')]];
    group[this.FORM_ADDRESS] = ['', [Validators.maxLength(this.ADDRESS_MAX_LENGTH)]];

    this.personFormGroup = this.fb.group(group);
  }

  getControl(controlName: string) {
    return this.personFormGroup.controls[controlName];
  }

  gatherData(): Person {
    const controls = this.personFormGroup.controls;
    const data = new Person();
    data.name = controls[this.FORM_NAME].value;
    data.lastName = controls[this.FORM_LAST_NAME].value;
    data.age = controls[this.FORM_AGE].value;
    data.rut = FormUtils.fullRutToInt(controls[this.FORM_RUT].value);
    data.vd = FormUtils.fullRutToVd(controls[this.FORM_RUT].value);
    data.address = controls[this.FORM_ADDRESS].value;
    return data;
  }

  async submit(): Promise<void>{
    const isValid = this.valid();
    this.invalidForm = !isValid;
    if (!isValid){
        this.messageService.add({severity: 'error', summary: 'Invalid form', detail: this.INVALID_FORM_MESSAGE});
        return;
    }

    let response;
    if (this.componentMode === ComponentMode.Create){
      response = await this.sendNewPersonData();
    }
    else{
      response = await this.sendUpdatePersonData();
    }

    if (response) {
        this.router.navigate(['..'], {relativeTo: this.activatedRoute.parent});
    }
    else {
        this.messageService.add({severity: 'error', summary: 'Server error', detail: this.SERVER_ERROR_MESSAGE});
    }
  }

  async sendNewPersonData(): Promise<any> {
    const dto = this.buildNewPersonDto();
    let response;
    try{
      response = await this.personService.personPost(dto, 'response').toPromise();
    }
    catch (e){
      return null;
    }
    return response != null;
  }

  async sendUpdatePersonData(): Promise<any> {
    const dto = this.buildUpdatePersonDto();
    let response;
    try{
      response = await this.personService.idPut(this.personId, dto, 'response').toPromise();
    }
    catch (e){
      return null;
    }
    return response != null;
  }

  buildNewPersonDto(): NewPersonRequest {
    const person = this.gatherData();
    return this.personMapperService.toNewPersonRequest(person);
  }

  buildUpdatePersonDto(): PersonDto {
    const person = this.gatherData();
    return this.personMapperService.toPersonDto(person);
  }


  valid(): boolean {
    FormUtils.validateAllFormFields(this.personFormGroup);
    return this.personFormGroup.valid;
  }

  protected showServerErrorMessage<T>(e: T): T{
    console.error(e);
    this.messageService.add({severity: 'error', summary: 'Server error', detail: this.SERVER_ERROR_MESSAGE });
    return e;
}


}
