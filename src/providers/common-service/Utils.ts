import { AbstractControl } from '@angular/forms';

export class Utils {
    static isNotPresent(control: AbstractControl): boolean {
        let value = control.value;
        if (value === undefined || value === null) {
            return true;
        }
        return value !== '' ? false : true;
    };
}