import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionComponent } from './question/question.component';
import { questionRoutes } from './question/question.routing';

import {ApiService} from './api.service';
import {AlertService} from './alert.service';
import {AuthService} from './auth.service';
import{ SocketService } from './socket.service'
import { AuthGuardService } from './auth-Guard.service';
import {ModalModule} from "ng2-modal";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule,
    RouterModule.forRoot([
       {
        path: '',
        redirectTo: '/question',
        pathMatch: 'full'
      },
      { 
        path: 'register', 
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      ...questionRoutes

    ])
  ],
  providers: [AlertService, ApiService, AuthService, AuthGuardService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
