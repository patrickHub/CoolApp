import {Routes, Router} from '@angular/Router';
import {QuestionComponent} from './question.component';
import { AuthGuard } from '../services/authGuard.service/authGuard.service';
 

export const questionRoutes: Routes = [
    {
        path: 'question',
        component: QuestionComponent,
        canActivate: [AuthGuard]
    }
]