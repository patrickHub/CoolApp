import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../services/api.service/api.service';
import { Question } from '../models/question';



@Component({
    templateUrl: 'app/result/result.component.html',
    styleUrls: ['app/result/result.component.scss']
})

export class ResultComponent implements OnInit{

    public options: RequestOptions;
    public selectedPoll: string = "";
    public selectedQuestionId: string="";
    public polls: any = [];
    public questions: any=[];
    public currentQuestion: any = [];
    public statistics: any = [];
    public ProgessBarClass: any = [];
    public nberConnectedStudent: number = 30;


    constructor(private apiService: ApiService){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.apiService.jwt());
        this.options = new RequestOptions({headers: headers});
    }
   

     public ngOnInit(){
        let url = "/api/polls";
        this.apiService.get(this.options, url).then(this.extractPolls.bind(this));
        this.ProgessBarClass.push("progress-bar progress-bar-success progress-bar-striped active");
        this.ProgessBarClass.push("progress-bar progress-bar-warning progress-bar-striped active");
        this.ProgessBarClass.push("progress-bar progress-bar-danger progress-bar-striped active");
        this.ProgessBarClass.push("progress-bar progress-bar-info progress-bar-striped active");

        
    }

    private onChangePoll(poll: any){
        this.selectedPoll = poll;
        this.questions = [];
        this.selectedQuestionId = "";
        this.currentQuestion = [];
        this.statistics = [];
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
        let url = "/api/statistics/" + this.currentQuestion._id; 
        this.apiService.get(this.options, url).then(this.extractStatitics.bind(this));
    }

    private getPercentage(result: any){
        return (result*100)/this.nberConnectedStudent + 0.1;
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
    private extractStatitics(res: Response){
        this.statistics = res.json();
    }
    private getProgressBar(){
        return this.ProgessBarClass[this.pick(0,3)];
    }
    private pick(min: number, max: number) {
    return Math.floor(
      Math.random() * (max - min) + min);
  }
    

}