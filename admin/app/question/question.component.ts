import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Question, Choice} from '../models/question';
import { ApiService } from '../services/api.service/api.service';
import{ Poll } from '../models/poll';
 


@Component({
    templateUrl: 'app/question/question.component.html',
    styles: [`
        .selected {
        background-color: #CFD8DC !important;
        color: white;
        }
        ul li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
        }
        ul li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
        }
    `]
})

export class QuestionComponent implements OnInit {
    public question: Question;
    public enablePoll: boolean;
    public newPoll: Poll
    public enableDescription: boolean;
    public hasAnswer: boolean;
    public currentChoice: Choice;
    public polls: any = [];
    public selectedPoll: String = "";
    public newPollTitle: string = "";
    public currentPoll: string = "";
    public currentDescription: string = "";
    public choiceNber: number = 0;
    public choiceIndex: number = 0;
    public isChoiceUpdate: boolean = false;
    public choiceMessage: string = ""
    public hasError: boolean = false;
    public options: RequestOptions;

    constructor(private apiService: ApiService, private router: Router){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + this.apiService.jwt());
        this.options = new RequestOptions({headers: headers});
    }
    public addChoice(): boolean{
        if((this.choiceNber === 3 && !this.isChoiceUpdate) && (!this.hasAnswer && !this.currentChoice.isAnswer)){
            this.hasError = true;
            return false;
      
        }
        if(this.currentChoice.isAnswer){
            this.hasAnswer = true;

        }
        if(this.isChoiceUpdate){
            this.question.choices[this.choiceIndex].title = this.currentChoice.title;
            this.question.choices[this.choiceIndex].isAnswer = this.currentChoice.isAnswer;
            this.isChoiceUpdate = false;
            console.log("is update");
            this.currentChoice.title = "";
            return true;
        }
        for(var i=0; i<this.question.choices.length; i++){
            if(this.currentChoice.title === this.question.choices[i].title){
                this.currentChoice.title = "";
                this.question.choices[i].isAnswer =  this.currentChoice.isAnswer;
                this.currentChoice.isAnswer = false;
                return false;
            }
        }
        this.question.choices.push(new Choice(this.currentChoice.title, this.currentChoice.isAnswer));
        this.currentChoice.title = "";
        this.currentChoice.isAnswer = false;
        this.choiceNber = this.choiceNber + 1;
        this.hasError = false;
        return true;
       
    
    }
    public addNewPoll(){
        this.newPoll.title = this.newPollTitle;
        this.polls.push(this.newPoll);
        let url = "/api/poll";
        let data = {
        "title": this.newPoll.title
        }
        this.apiService.post(this.options, data, url).then();
        this.newPollTitle = "";
    }
     public addDescription(){
        this.question.description = this.currentDescription;
        this.currentDescription = "";
        this.enableDescription = false;
        
    }
    
    public updatePoll(){
        this.enablePoll = true;
        this.currentPoll = this.question.poll;
    }
     public updateDescription(){
        this.enableDescription = true;
        this.currentDescription = this.question.description;
    }
    public updateChoice(choice: Choice){
        this.isChoiceUpdate = true;
        if(choice.isAnswer){
            this.hasAnswer = false;
        }
        this.choiceIndex = this.question.choices.indexOf(choice);
        this.currentChoice.title = this.question.choices[this.choiceIndex].title;
        this.currentChoice.isAnswer = this.question.choices[this.choiceIndex].isAnswer;
    }
    
    public publishQuestion(){
        if(!this.selectedPoll || !this.hasAnswer || (this.choiceNber < 2)){
            this.hasError = true;
            return;
        }
        console.log("Poll : " + this.selectedPoll )
        let url = "/api/question";
        let data = {
            "description": this.question.description,
            "choices": this.question.choices,
            "poll": this.selectedPoll  
        }
      
        this.apiService.post(this.options, data, url,).then();
    }
    public ngOnInit(){
        this.newPoll = new Poll("","");
        this.question = new Question();
        this.currentChoice = new Choice("", false);
        this.enablePoll = true;
        this.enableDescription = true;
        this.hasAnswer = false;
        let url = "/api/polls";
        this.apiService.get(this.options, url).then(this.extractData.bind(this));
    }

    private extractData(res: Response) {
        this.polls = res.json();
        console.log(res.json());
    }
}
