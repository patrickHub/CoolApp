import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//import{ROUTER_DIRECTIVES} from '@angular/router';

import { AppComponent }  from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { PoolComponent } from './pool/pool.component';
import { QuestionComponent } from './question/question.component';
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { PublishQuestionComponent } from './publish-question/publish-question.component';
import {routing} from './app.Routing';

import {EqualPasswordsValidator} from './services/validators/equalPassword.Validator.service';
import {EmailValidator} from './services/validators/email.validator.service';

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    PoolComponent,
   QuestionComponent,
   NewQuestionComponent,
   PublishQuestionComponent
  ],
  providers: [EqualPasswordsValidator, EmailValidator],
  bootstrap: [AppComponent],
  //directives: [ROUTER_DIRECTIVES]
})
export class AppModule { }