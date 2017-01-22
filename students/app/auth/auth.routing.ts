import { Routes } from '@angular/Router';

import{ AuthComponent } from './auth.component';
import { QuestionComponent } from '../question/question.component';
import { ResultComponent } from '../result/result.component'
import { questionRoutes } from '../question/question.routing';
import { AuthGuard } from '../services/authGuard.service/authGuard.service';

export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: QuestionComponent
            },
            {
                path: 'result',
                component: ResultComponent
            },
            ...questionRoutes
        ]
    }
]