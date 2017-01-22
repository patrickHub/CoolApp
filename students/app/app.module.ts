import { NgModule }      from '@angular/core';
import {ModalModule} from "ng2-modal";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//import{ROUTER_DIRECTIVES} from '@angular/router';

import { AppComponent }  from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { AlertComponent } from './alert/alert.component';
import {routing} from './app.Routing';

import {ApiService} from './services/api.service/api.service';
import {AlertService} from './services/alert.service/alert.service';
import { AuthGuard } from './services/authGuard.service/authGuard.service';
import {AuthService} from './services/auth.service/auth.service';


@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ModalModule
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    QuestionComponent,
    AlertComponent
  ],
  providers: [AlertService, ApiService, AuthGuard, AuthService],
  bootstrap: [AppComponent],
  //directives: [ROUTER_DIRECTIVES]
})
export class AppModule { }