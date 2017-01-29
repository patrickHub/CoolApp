import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as io from "socket.io-client";

@Injectable()
export class SocketService implements OnInit{

  private totalUsers:  ReplaySubject<any>;
  private numbers: number;
  private socket: any;
  constructor() { 
        this.numbers = 0;
        this.totalUsers = new ReplaySubject<any>(1);
        this.totalUsers.next({});  
        this.socket = io('https://coolappserver.herokuapp.com');
        console.log("New connection is made");
        this.socket.on('msg_newstudent', function(student){
            console.log("New student fullName : " +  student.fullName);
            this.numbers = this.numbers + 1;
            console.log("number: " + this.numbers);
           this.totalUsers.next({totalUsers: this.numbers});
         }.bind(this)
        );
      }


   getTotalUsers(): Observable<any> {
        return this.totalUsers.asObservable();
    }

    public ngOnInit(){}
  

}
