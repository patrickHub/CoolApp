import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../services/api.service/api.service';
import { Question } from '../models/question';



@Component({
    templateUrl: 'app/question/question.component.html',
    styleUrls: ['app/question/question.component.scss']
})

export class QuestionComponent implements OnInit{

    public options: RequestOptions;
    public selectedPoll: string = "";
    public selectedQuestionId: string="";
    public polls: any = [];
    public questions: any=[];
    public currentQuestion: any = [];
    public nberConnectedStudent: number = 30;


    constructor(private apiService: ApiService){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.apiService.jwt());
        this.options = new RequestOptions({headers: headers});
    }
   

     public ngOnInit(){
        let url = "/api/students/polls";
        this.apiService.get(this.options, url).then(this.extractPolls.bind(this));
    }

    private onChangePoll(poll: any){
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
    }

    private extractPolls(res: Response) {
        this.polls = res.json();
        console.log("length: " + this.polls.length );
    }
    private extractQuestions(res: Response){
        this.questions = res.json().questions;
    }
    

}