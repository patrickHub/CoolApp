"use strict";
var auth_component_1 = require("./auth.component");
var question_component_1 = require("../question/question.component");
var result_component_1 = require("../result/result.component");
var question_routing_1 = require("../question/question.routing");
var authGuard_service_1 = require("../services/authGuard.service/authGuard.service");
exports.authRoutes = [
    {
        path: 'auth',
        component: auth_component_1.AuthComponent,
        canActivate: [authGuard_service_1.AuthGuard],
        children: [
            {
                path: '',
                component: question_component_1.QuestionComponent
            },
            {
                path: 'result',
                component: result_component_1.ResultComponent
            }
        ].concat(question_routing_1.questionRoutes)
    }
];
//# sourceMappingURL=auth.routing.js.map