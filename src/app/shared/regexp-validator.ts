import { AbstractControl, ValidatorFn } from '@angular/forms';

export default function regExpValidator(re: RegExp, fieldName: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value = control.value;
    const no = re.test(value);
    return no ? null : { [fieldName]: {value}};
  };
}
