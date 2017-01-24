import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup,  AbstractControl, Validators} from '@angular/forms';
import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';


@Component({

    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})


export class LoginComponent implements OnInit{

public formLogin: FormGroup;
public username: AbstractControl;
public password: AbstractControl;
public message : any;
public soumitted: boolean;
public loading: boolean;

public constructor(fb: FormBuilder, private alertService: AlertService, private authService: AuthService, private router: Router){
    this.formLogin = fb.group({
        'username': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.username = this.formLogin.controls['username'];
    this.password = this.formLogin.controls['password'];
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
        this.authService.login(this.formLogin.value.username, this.formLogin.value.password)
            .subscribe(
                data =>{
                    console.log("From Data");
                    this.router.navigate(['/auth']);
                },
                error =>{
                    this.alertService.errorLogin(error.json().message);
                    this.loading = false;
                }
            )
    }
}
}


