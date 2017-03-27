/* tslint:disable: member-ordering forin */
import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User }      from '../shared/user';

const userEmail = 'test@test.pl';
const userPassword = 'Password1';
const fakeDelay = 2000;
const fakeRandomId = 42;

@Component({
  selector: 'login-form-template',
  templateUrl: './login-form-template.component.html'
})
export class LoginFormTemplateComponent implements AfterViewChecked {
  user = new User(fakeRandomId, '', '', false);
  // user = new User(fakeRandomId, 'ab@cd.pl', 'asdSD123', false);

  successfull = false;
  submitted = false;
  submitting = false;


  onSubmit() {
    this.submitting = true;
    // faking server response delay
    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
      const { email, password } = this.user;

      if (email === userEmail && password === userPassword) {
        this.successfull = true;
      } else {
        this.successfull = false;
      }
    }, fakeDelay);
  }

  active = true;

  loginForm: NgForm;
  @ViewChild('loginForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.loginForm) { return; }
    this.loginForm = this.currentForm;
    if (this.loginForm) {
      this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'validEmail':    'Must be a valid email address.'
    },
    'password': {
      'required':      'Password is required.',
      'validPassword': 'Password must be at least 6 characters long and must include 1 upper case letter, 1 lower case letter and 1 digit.'
    }
  };
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
