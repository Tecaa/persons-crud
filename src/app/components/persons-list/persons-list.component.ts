import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {

  @Input()
  public persons: Person[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.persons);
  }

}
