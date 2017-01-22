import { Routes, RouterModule }  from '@angular/router';

import { RegisterComponent } from './register.component';
import { AuthGuard } from '../services/authGuard.service/authGuard.service';

export const registerRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  }
];
