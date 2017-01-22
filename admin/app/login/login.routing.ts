import {Routes, Router} from '@angular/Router';
import {LoginComponent} from './login.component';
import { AlertComponent } from '../alert/alert.component';
 

export const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }
]