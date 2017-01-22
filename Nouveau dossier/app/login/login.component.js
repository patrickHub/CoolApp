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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var alert_service_1 = require("../services/alert.service/alert.service");
var auth_service_1 = require("../services/auth.service/auth.service");
var LoginComponent = (function () {
    function LoginComponent(fb, alertService, authService, router) {
        this.alertService = alertService;
        this.authService = authService;
        this.router = router;
        this.formLogin = fb.group({
            'fullName': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])]
        });
        this.fullName = this.formLogin.controls['fullName'];
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngOnInit");
        this.alertService.getLoginMessage().subscribe(function (message) {
            _this.message = message;
        });
        this.authService.logout();
    };
    LoginComponent.prototype.onSubmit = function (value) {
        var _this = this;
        this.soumitted = true;
        console.log('From LoginComponent');
        if (this.formLogin.valid) {
            this.loading = true;
            this.authService.login(this.formLogin.value.fullName)
                .subscribe(function (data) {
                console.log("From Data");
                _this.router.navigate(['/question']);
            }, function (error) {
                _this.alertService.errorLogin(error.json().message);
                _this.loading = false;
            });
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/login/login.component.html',
        styleUrls: ['app/login/login.component.scss'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, alert_service_1.AlertService, auth_service_1.AuthService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map