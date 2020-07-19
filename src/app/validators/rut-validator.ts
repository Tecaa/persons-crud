import { FormControl } from '@angular/forms';
import { RutUtils } from '../utils/rut.utils';

export class RutValidator {
    public static validate(formControl: FormControl) {
        const rutUtils = new RutUtils(); //TODO: refactor

        if (!formControl.value) {
            return null;
        }
        if (rutUtils.validate(formControl.value)) {
            return null;
        } else {
            return {
                validateRut: {
                    valid: false
                }
            };
        }
    }
}