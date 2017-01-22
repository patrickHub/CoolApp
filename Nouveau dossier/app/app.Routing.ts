// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { loginRoutes } from './login/login.routing'
import { registerRoutes }    from './register/register.Routing';
//import { questionRoutes } from './question/question.Routing'
;


// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
    // Add register routes form a different file
  ...registerRoutes,
  ...loginRoutes
 // ...questionRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);