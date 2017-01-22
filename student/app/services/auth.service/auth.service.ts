import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {AlertService} from '../alert.service/alert.service';

@Injectable()
export class AuthService {
    constructor(private http: Http, private alertService: AlertService, private router: Router) { }

    login(fullName: string) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3030/api/student/auth', JSON.stringify({ fullName: fullName}), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let student = response.json();
                if (student) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('student', JSON.stringify(student));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('student');
    }
}