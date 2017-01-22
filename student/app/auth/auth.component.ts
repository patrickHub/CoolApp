import { Component } from '@angular/core';
import{ Router } from '@angular/router';
import { AlertService } from '../services/alert.service/alert.service';
import { AuthService } from '../services/auth.service/auth.service';
 
 


@Component({
    templateUrl: 'app/auth/auth.component.html'
   // styleUrls: ['app/auth/auth.component.scss']
})

export class AuthComponent{
    
    public sideMenu: string = "question";
    constructor(private router: Router, private alertService: AlertService, private authService: AuthService){}

    
    changeMenuQuestion(){
        this.sideMenu = "question";
        console.log("sideMenu: " + this.sideMenu);
    }
    changeMenuResult(){
        this.sideMenu = "result";
        console.log("sideMenu: " + this.sideMenu);
    }
    signOut(){
        
        this.alertService.success('You have been logout sucessfully', true);
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}