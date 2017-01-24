import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { AuthComponent } from './auth/auth.component';
import { authRoutes } from './auth/auth.routing';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  }, { 
        path: 'register', 
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      } ,
      authRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);