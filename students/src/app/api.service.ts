
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  /**
   * Handles error responses
   * @param { Reponse | any } error: Error response sent by server
   * @return { Promise } Promisified error message
   */
  private handleError(error: Response | any) {
    console.log(error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

 private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || {};
  }


  post(options:any, data: any, url: any): any {
    return this.http.post("https://coolappserver.herokuapp.com" + url, JSON.stringify(data), options)
      .toPromise()
    }



  get(options: any, url:any): any {
    return this.http.get("https://coolappserver.herokuapp.com" + url, options)

      .toPromise()
  }

    // private helper methods

  currentUser() {
        // create authorization header with jwt token
        let student = JSON.parse(localStorage.getItem('student'));
        if (student) {
          return student;
        }
    }
  constructor(private http: Http) { }

}
