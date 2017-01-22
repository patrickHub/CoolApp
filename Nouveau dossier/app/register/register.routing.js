"use strict";
var register_component_1 = require("./register.component");
var authGuard_service_1 = require("../services/authGuard.service/authGuard.service");
exports.registerRoutes = [
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        canActivate: [authGuard_service_1.AuthGuard]
    }
];
//# sourceMappingURL=register.Routing.js.map