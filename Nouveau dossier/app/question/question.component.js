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
var http_1 = require("@angular/http");
var api_service_1 = require("../services/api.service/api.service");
var QuestionComponent = (function () {
    function QuestionComponent(apiService) {
        this.apiService = apiService;
        this.selectedPoll = "";
        this.selectedQuestionId = "";
        this.polls = [];
        this.questions = [];
        this.currentQuestion = [];
        this.nberConnectedStudent = 30;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + this.apiService.jwt());
        this.options = new http_1.RequestOptions({ headers: headers });
    }
    QuestionComponent.prototype.ngOnInit = function () {
        var url = "/api/students/polls";
        this.apiService.get(this.options, url).then(this.extractPolls.bind(this));
    };
    /* private onChangePoll(poll: any){
         this.selectedPoll = poll;
         this.questions = [];
         this.selectedQuestionId = "";
         this.currentQuestion = [];
         let url = "/api/polls/" + this.selectedPoll;
         this.apiService.get(this.options, url).then(this.extractQuestions.bind(this));
     }
 
     private onChangeQuestion(question: any){
         this.selectedQuestionId = question;
         for(var i = 0; i<this.questions.length; i++){
             if(this.questions[i]._id===this.selectedQuestionId){
                 this.currentQuestion = this.questions[i];
             }
         }
     }
     private getTitle(choiceId: any){
         for(var i= 0; i<this.currentQuestion.choices.length; i++){
             if(this.currentQuestion.choices[i]._id === choiceId)
             return this.currentQuestion.choices[i].title;
         }
     }*/
    QuestionComponent.prototype.extractPolls = function (res) {
        this.polls = res.json();
        console.log("length: " + this.polls.length);
    };
    QuestionComponent.prototype.extractQuestions = function (res) {
        this.questions = res.json().questions;
    };
    return QuestionComponent;
}());
QuestionComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/question/question.component.html',
        styleUrls: ['app/question/question.component.scss']
    }),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], QuestionComponent);
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map