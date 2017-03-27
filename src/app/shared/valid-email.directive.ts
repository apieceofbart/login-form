import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';
import regExpValidator from './regexp-validator';

// tslint:disable-next-line:max-line-length
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const fieldName = 'validEmail';

@Directive({
  selector: `[${fieldName}]`,
  providers: [{provide: NG_VALIDATORS, useExisting: ValidEmailDirective, multi: true}]
})
export class ValidEmailDirective implements Validator, OnChanges {
  @Input() validEmail: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes[fieldName];
    if (change) {
      this.valFn = regExpValidator(EMAIL_REGEXP, fieldName);
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
