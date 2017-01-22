"use strict";
var router_1 = require("@angular/router");
var login_routing_1 = require("./login/login.routing");
var register_Routing_1 = require("./register/register.Routing");
//import { questionRoutes } from './question/question.Routing'
;
// Route Configuration
exports.routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
].concat(register_Routing_1.registerRoutes, login_routing_1.loginRoutes);
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.Routing.js.map