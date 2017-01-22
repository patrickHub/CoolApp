import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import{ Router } from '@angular/router';
import { AlertService } from '../services/alert.service/alert.service';
import { ApiService } from '../services/api.service/api.service';
import { AuthService } from '../services/auth.service/auth.service';
import { Question } from '../models/question';



@Component({
    templateUrl: 'app/question/question.component.html',
    styleUrls: ['app/question/question.component.scss']
})

export class QuestionComponent implements OnInit{

    public options: RequestOptions;
    public selectedPollId: string = "";
    public currentPoll: any = [];
    public selectedQuestionId: string="";
    public polls: any = [];
    public selectedAnswerId: string = "";
    public questions: any=[];
    public currentQuestion: any = [];
    public nberConnectedStudent: number = 30;


    constructor(private apiService: ApiService, private router: Router, private alertService: AlertService, private authService: AuthService){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        this.options = new RequestOptions({headers: headers});
    }
   

     public ngOnInit(){
        let url = "/api/students/polls";
        this.apiService.get(this.options, url).then(this.extractPolls.bind(this));
    }

    private onChangePoll(poll: any){
        this.selectedPollId = poll;
        this.questions = [];
        this.selectedQuestionId = "";
        this.currentQuestion = [];
        this.selectedAnswerId = "";
        let url = "/api/polls/" + this.selectedPollId;
        this.apiService.get(this.options, url).then(this.extractQuestions.bind(this));
        for(var i = 0; i<this.polls.length; i++){
            if(this.polls[i]._id===this.selectedPollId){
                this.currentPoll= this.polls[i];
            }
        }
    }

    private ValidateAnswer(){
        let url = "/api/answer/";
        let data = {
            "question": this.selectedQuestionId,
            "choice": this.selectedAnswerId,
            "student": this.apiService.currentUser()
        }
        console.log(data);
        this.apiService.post(this.options, data,url).then();
        var index = this.questions.indexOf(this.currentQuestion, 0);
        this.questions.splice(index, 1);
        if(index < this.questions.length){
            this.currentQuestion = this.questions[index];
            this.selectedQuestionId = this.currentQuestion._id;
        }else{
            var indexPoll = this.polls.indexOf(this.currentPoll, 0);
            this.polls.splice(indexPoll, 1);
            if(indexPoll<this.polls.length){
                this.currentPoll = this.polls[indexPoll];
                this.selectedPollId = this.currentPoll._id;
            }
            this.currentQuestion = [];
            this.selectedQuestionId = "";

        }
        this.selectedAnswerId = "";
    }

    private onChangeQuestion(question: any){
        this.selectedQuestionId = question;
        this.selectedAnswerId = "";
        for(var i = 0; i<this.questions.length; i++){
            if(this.questions[i]._id===this.selectedQuestionId){
                this.currentQuestion = this.questions[i];
            }
        }
    }

    private onChangeAnswer(choice: any){
        this.selectedAnswerId = choice._id;
    }
    private getTitle(choiceId: any){
        for(var i= 0; i<this.currentQuestion.choices.length; i++){
            if(this.currentQuestion.choices[i]._id === choiceId)
            return this.currentQuestion.choices[i].title;
        }
    }

    private extractPolls(res: Response) {
        this.polls = res.json();
    }
    private extractQuestions(res: Response){
        this.questions = res.json().questions;
    }
    private signOut(){
        
        this.alertService.success('You have been logout sucessfully', true);
        this.authService.logout();
        this.router.navigate(['/login']);
    }
    

}