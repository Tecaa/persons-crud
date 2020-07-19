import { Injectable } from '@angular/core';
import { PersonDto } from '../../api/model/personDto';
import { Person } from 'src/app/classes/person';
import { NewPersonRequest } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class PersonMapperService {

  constructor() { }

  public toPerson(dto: PersonDto): Person {
    const person = new Person();
    person.rut = dto.rut;
    person.vd = dto.vd;
    person.name = dto.name;
    person.lastName = dto.lastName;
    person.age = dto.age;
    person.address = dto.address;
    person.id = dto.id;
    return person;
  }

  public toPersonDto(person: Person): PersonDto {
    const dto = {} as PersonDto;
    dto.rut = person.rut;
    dto.vd = person.vd;
    dto.name = person.name;
    dto.lastName = person.lastName;
    dto.age = person.age;
    dto.address = person.address;
    dto.id = person.id;
    return dto;
  }

  public toNewPersonRequest(person: Person): NewPersonRequest {
    const dto = {} as NewPersonRequest;
    dto.rut = person.rut;
    dto.vd = person.vd;
    dto.name = person.name;
    dto.lastName = person.lastName;
    dto.age = person.age;
    dto.address = person.address;
    return dto;
  }

  public toPersonDtoList(persons: Person[]): PersonDto[] {
    const personsDto: PersonDto[] = [];
    persons.forEach((person: Person) => {
      personsDto.push(this.toPersonDto(person));
    });
    return personsDto;
  }

  public toPersonList(personsDto: PersonDto[]): Person[] {
    const persons: Person[] = [];
    personsDto.forEach((personDto: PersonDto) => {
      persons.push(this.toPerson(personDto));
    });
    return persons;
  }
}
