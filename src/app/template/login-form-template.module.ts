import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { SharedModule }               from '../shared/shared.module';
import { LoginFormTemplateComponent } from './login-form-template.component';

@NgModule({
  imports:      [ SharedModule, FormsModule ],
  declarations: [ LoginFormTemplateComponent ],
  exports:      [ LoginFormTemplateComponent ]
})
export class LoginFormTemplateModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
