import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
];

export class RepeatPasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('confirmation').value && control.dirty)
    // const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    // const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    // return (invalidCtrl || invalidParent);
  }

}


export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.confirmation.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true }     
}