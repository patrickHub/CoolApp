
import { Component } from '@angular/core';
import{ Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';
 
 


@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent{
    
    constructor(private router: Router, private alertService: AlertService, private authService: AuthService){}

    signOut(){
        
        this.alertService.success('You have been logout sucessfully', true);
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
