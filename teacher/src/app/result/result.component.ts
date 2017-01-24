import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../api.service';
import{ SocketService } from '../socket.service'
import { Question } from '../question';
import * as io from "socket.io-client";



@Component({
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
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
    public totalUsers: any = [];
    public totalAnswers: number = 1;
    public socket: any;


    constructor(private apiService: ApiService, private socketService: SocketService){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.apiService.jwt());
        this.options = new RequestOptions({headers: headers});
    }
   

    public ngOnInit(){
        let url = "/api/polls";
        this.apiService.get(this.options, url).then(this.extractPolls.bind(this));
        this.socket = io('https://coolappserver.herokuapp.com');
        console.log("New connection is made");
        this.socketService.getTotalUsers().subscribe(totalUsers => { 
        this.totalUsers = totalUsers; });
        this.socket.on('msg_newanswer', function(answer){
            console.log("New answer : " + answer);
            let newAnswer = answer
            if(this.selectedQuestionId === newAnswer.question){
                this.totalAnswers = this.totalAnswers + 1;
                for(var i = 0; i<this.statistics.choicesAnswers.length; i++){
                    if(this.statistics.choicesAnswers[i].choice === newAnswer.choice){
                        this.statistics.choicesAnswers[i].totalAnswers = this.statistics.choicesAnswers[i].totalAnswers + 1;
                    }
                }
            }
           
         }.bind(this)
        );
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
        this.totalAnswers = 1;
        for(var i = 0; i<this.questions.length; i++){
            if(this.questions[i]._id===this.selectedQuestionId){
                this.currentQuestion = this.questions[i];
            }
        }
        let url = "/api/statistics/" + this.currentQuestion._id; 
        this.apiService.get(this.options, url).then(this.extractStatitics.bind(this));
    }

    private getPercentage(result: any){
        return (result*100)/this.totalAnswers;
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
        for(var i = 0; i<this.statistics.choicesAnswers.length; i++){
           this.totalAnswers = this.statistics.choicesAnswers[i].totalAnswers + this.totalAnswers;
        }
    }
    private getProgressBar(){
        return this.ProgessBarClass[this.pick(0,3)];
    }
    private pick(min: number, max: number) {
    return Math.floor(
      Math.random() * (max - min) + min);
  }
    

}