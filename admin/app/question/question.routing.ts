import { Routes} from '@angular/router';
import { NewQuestionComponent } from './new-question/new-question.component';
import { QuestionComponent } from './question.component';


export const questionRoutes: Routes =[
    {
        path: 'question',
        component: QuestionComponent,
       /* children: [
            {
                path: 'new',
                component: NewQuestionComponent
            }
        ]*/
    }
]