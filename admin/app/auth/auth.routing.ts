import { Routes } from '@angular/Router';

import{ AuthComponent } from './auth.component';
import { PoolComponent } from '../pool/pool.component';
import { QuestionComponent } from '../question/question.component';
import { PublishQuestionComponent } from '../publish-question/publish-question.component'
import { questionRoutes } from '../question/question.routing';

export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '',
                component: PoolComponent
            },
            {
                path: 'pool',
                component: PoolComponent
            },
            {
                path: 'publish',
                component: PublishQuestionComponent
            },
            ...questionRoutes
        ]
    }
]