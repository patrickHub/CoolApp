import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AlertService {
    private subjectLogin: ReplaySubject<any>;
    private subjectRegister: ReplaySubject<any>;
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
         this.subjectLogin = new ReplaySubject<any>(1);
         this.subjectRegister = new ReplaySubject<any>(1);
         // clear alert message on route change
         router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subjectLogin.next(null);
                    this.subjectRegister.next(null);
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        console.log("CALLED success");
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subjectLogin.next({ type: 'success', text: message });
    }

    errorLogin(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subjectLogin.next({ type: 'error', text: message });
    }

    errorRegister(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subjectRegister.next({ type: 'error', text: message });
    }

    getLoginMessage(): Observable<any> {
        return this.subjectLogin.asObservable();
    }
    getRegisterMessage(): Observable<any> {
        return this.subjectRegister.asObservable();
    }
}