import { FormControl } from '@angular/forms';
import { RutUtils } from '../utils/rut.utils';
import { Injectable } from '@angular/core';

@Injectable()
export class RutValidator {
    constructor(private rutUtils: RutUtils){
    }

    public validate(formControl: FormControl) {
        if (!formControl.value) {
            return null;
        }
        if (this.rutUtils.validate(formControl.value)) {
            return null;
        } else {
            return {
                validateRUN: {
                    valid: false
                }
            };
        }
    }
}