"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ng2_modal_1 = require("ng2-modal");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
//import{ROUTER_DIRECTIVES} from '@angular/router';
var app_component_1 = require("./app.component");
var register_component_1 = require("./register/register.component");
var login_component_1 = require("./login/login.component");
//import { QuestionComponent } from './question/question.component';
var alert_component_1 = require("./alert/alert.component");
var app_Routing_1 = require("./app.Routing");
var api_service_1 = require("./services/api.service/api.service");
var alert_service_1 = require("./services/alert.service/alert.service");
var authGuard_service_1 = require("./services/authGuard.service/authGuard.service");
var auth_service_1 = require("./services/auth.service/auth.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            app_Routing_1.routing,
            ng2_modal_1.ModalModule
        ],
        declarations: [
            app_component_1.AppComponent,
            register_component_1.RegisterComponent,
            login_component_1.LoginComponent,
            // QuestionComponent,
            alert_component_1.AlertComponent
        ],
        providers: [alert_service_1.AlertService, api_service_1.ApiService, authGuard_service_1.AuthGuard, auth_service_1.AuthService],
        bootstrap: [app_component_1.AppComponent],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map