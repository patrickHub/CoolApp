import {Routes, Router} from '@angular/Router';
import {QuestionComponent} from './question.component';
import { AuthGuardService } from '../auth-Guard.service';
 

export const questionRoutes: Routes = [
    {
        path: 'question',
        component: QuestionComponent,
        canActivate: [AuthGuardService]
    }
]