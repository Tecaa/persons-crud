import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/classes/person';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng';
import { PersonService } from '../../api/api/person.service';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']

})
export class PersonsListComponent implements OnInit {

  @Input()
  public persons: Person[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private messageService: MessageService, private confirmationService: ConfirmationService,
              private personService: PersonService) { }

  ngOnInit(): void {
  }

  editRow(person: Person): void{
    this.router.navigate(['person/' + person.id], {relativeTo: this.activatedRoute.parent});
  }

  deleteRow(person: Person): void{
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this person?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: this.acceptDelete.bind(this, person.id)
    });
  }

  async acceptDelete(personId: number){
    try{
      await this.personService.idDelete(personId).toPromise();
      this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'Deleted'});
      this.deleteFromTable(personId);
    }
    catch (e){
      console.error(e);
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Person could not be deleted'});
    }
  }

  deleteFromTable(personId: number): any {
    const index: number = this.persons.findIndex(p => p.id === personId);
    if (index !== -1) {
        this.persons.splice(index, 1);
    }
  }
}
