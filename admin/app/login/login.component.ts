import {Component} from '@angular/core';
import {FormBuilder, FormGroup,  AbstractControl, Validators} from '@angular/forms';


@Component({

    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.scss']

})


export class LoginComponent{

public formLogin: FormGroup;
public username: AbstractControl;
public password: AbstractControl;

public soumitted: boolean;

public constructor(fb: FormBuilder){
    this.formLogin = fb.group({
        'username': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.username = this.formLogin.controls['username'];
    this.password = this.formLogin.controls['password'];
}

public onsubmit(value: Object): void{
    this.soumitted = true;
    if(this.formLogin.valid){

    }
}

}

