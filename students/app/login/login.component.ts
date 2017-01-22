import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup,  AbstractControl, Validators} from '@angular/forms';
import { AlertService } from '../services/alert.service/alert.service';
import { AuthService } from '../services/auth.service/auth.service';


@Component({

    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.scss'],
   // providers: [AlertService]

})


export class LoginComponent implements OnInit{

public formLogin: FormGroup;
public fullName: AbstractControl;
public message : any;
public soumitted: boolean;
public loading: boolean;

public constructor(fb: FormBuilder, private alertService: AlertService, private authService: AuthService, private router: Router){
    this.formLogin = fb.group({
        'fullName': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.fullName = this.formLogin.controls['fullName'];
    this.loading = false;
}

 ngOnInit() {
     console.log("ngOnInit");
     this.alertService.getLoginMessage().subscribe(message => { 
        this.message = message; });
     this.authService.logout();
}

public onSubmit(value: Object): void{
    this.soumitted = true;
    console.log('From LoginComponent');
    if(this.formLogin.valid){
        this.loading = true;
        this.authService.login(this.formLogin.value.fullName)
            .subscribe(
                data =>{
                    console.log("From Data");
                    this.router.navigate(['/question']);
                },
                error =>{
                    this.alertService.errorLogin(error.json().message);
                    this.loading = false;
                }
            )
    }
}
}

