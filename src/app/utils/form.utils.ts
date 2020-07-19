import { FormGroup, FormControl } from '@angular/forms';

export class FormUtils {
    public static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            FormUtils.validateAllFormFields(control);
        }
        });
    }

    public static fullRutToInt(fullRut: string): number{
        fullRut = fullRut.replace('.', '');
        fullRut = fullRut.replace('-', '');
        fullRut = fullRut.substr(0, fullRut.length - 1);

        return parseInt(fullRut, 10);
    }

    public static fullRutToVd(fullRut: string): string{
        return fullRut[fullRut.length - 1];
    }

    public static intToFullRut(intRut: number): string{
        const dv = FormUtils.getDv(intRut.toString());
        return intRut + '-' + dv;
    }

    public static getDv(rut: string): string{
        let sum = 0;
        let mul = 2;
        for (let i = rut.length - 1; i >= 0; i--) {
            sum = sum + parseInt(rut.charAt(i), 10) * mul;
            if (mul === 7) {
                mul = 2;
            } else {
                mul++;
            }
        }
        let res = sum % 11;
        res = 11 - res;
        if (res === 10) {
            return 'k';
        } else if (res === 11) {
            return '0';
        } else {
            return res.toString();
        }
    }
}
