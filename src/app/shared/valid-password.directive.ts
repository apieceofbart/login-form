import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';
import regExpValidator from './regexp-validator';

const PASSWORD_REGEXP = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,})\S$/;
const fieldName = 'validPassword';

@Directive({
  selector: `[${fieldName}]`,
  providers: [{provide: NG_VALIDATORS, useExisting: ValidPasswordDirective, multi: true}]
})
export class ValidPasswordDirective implements Validator, OnChanges {
  @Input() validPassword: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes[fieldName];
    if (change) {
      this.valFn = regExpValidator(PASSWORD_REGEXP, fieldName);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}



/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
