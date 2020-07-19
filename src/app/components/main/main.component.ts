import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/classes/person';
import { PersonService } from '../../api/api/person.service';
import { PersonMapperService } from '../../services/mappers/person-mapper.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  public persons: Person[];
  constructor(private personService: PersonService, private personMapperService: PersonMapperService){
  }

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    const personsFromDb = await this.personService.personGet().toPromise();
    this.persons = this.personMapperService.toPersonList(personsFromDb);
  }
}
