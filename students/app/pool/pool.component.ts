import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../services/api.service/api.service';
import{ Poll } from '../models/poll';

@Component({
    templateUrl: 'app/pool/pool.component.html'
})

export class PoolComponent {
    public poll: Poll ;
    public title: string = "";
    public polls: any = [];
    public options: RequestOptions;

    constructor(private apiService: ApiService){
      this.poll = new Poll("","");
      let url = "/api/polls";
      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + this.apiService.jwt());
      this.options = new RequestOptions({headers: headers});
      this.apiService.get(this.options,url).then(this.extractData.bind(this));
   
    }



    public addPoll(){
        this.poll.title = this.title;
        this.polls.push(this.poll);
        let url = "/api/poll";
        let data = {
        "title": this.poll.title
        }
        this.apiService.post(this.options, data, url).then();
        this.title = "";
    }

    private extractData(res: Response) {
    this.polls = res.json();
  }
}