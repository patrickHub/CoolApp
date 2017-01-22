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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var api_service_1 = require("../services/api.service/api.service");
var alert_service_1 = require("../services/alert.service/alert.service");
var RegisterComponent = (function () {
    function RegisterComponent(fb, apiService, alertService, router) {
        this.apiService = apiService;
        this.alertService = alertService;
        this.router = router;
        this.submitted = false;
        this.formRegister = fb.group({
            'fullName': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])]
        });
        this.fullName = this.formRegister.controls['fullName'];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getRegisterMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    RegisterComponent.prototype.extractData = function (res) {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
    };
    RegisterComponent.prototype.extractError = function (error) {
        this.alertService.errorRegister(error.json().message);
        this.loading = false;
    };
    RegisterComponent.prototype.onSubmit = function (values) {
        this.submitted = true;
        if (this.formRegister.valid) { }
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "/api/student/register";
        var data = {
            "fullName": this.formRegister.value.fullName
        };
        console.log("data\n" + data);
        this.loading = true;
        return this.apiService.post(options, data, url).then(this.extractData.bind(this))
            .catch(this.extractError.bind(this));
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/register/register.component.html',
        styleUrls: ['app/register/register.component.scss'],
        providers: [api_service_1.ApiService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, api_service_1.ApiService, alert_service_1.AlertService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map