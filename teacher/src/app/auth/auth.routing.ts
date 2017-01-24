import { Routes } from '@angular/Router';

import{ AuthComponent } from './auth.component';
import { QuestionComponent } from '../question/question.component';
import { ResultComponent } from '../result/result.component'
import { AuthGuardService } from '../auth-Guard.service';

export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                component: QuestionComponent
            },
            {
                path: 'question',
                component: QuestionComponent
            },
            {
                path: 'result',
                component: ResultComponent
            },{
                path: 'result',
                component: ResultComponent
            }
        ]
    }
]