import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  public persons: Person[];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): any {
    const p1 = new Person();
    p1.name = 'Jimmy';
    p1.lastName = 'Raynor';
    p1.age = 42;
    p1.rut = 9810616;
    p1.vd = '2';
    p1.address = 'Augustgrad 4112, Korhal';
    const p2 = new Person();
    p2.name = 'Sarah';
    p2.lastName = 'Kerrigan';
    p2.age = 38;
    p2.rut = 11832947;
    p2.vd = '3';
    p2.address = 'Talematros 243, Shakuras';
    this.persons = [p1, p2];
    console.log("persons", this.persons);
  }
}
