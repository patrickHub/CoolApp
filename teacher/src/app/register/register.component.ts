import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {EmailValidatorService} from '../email-validator.service';
import {EqualPasswordValidatorService} from '../equal-password-validator.service';
import {ApiService} from '../api.service';
import{ AlertService } from '../alert.service';



@Component({

   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css'],
 
  providers: [EqualPasswordValidatorService, EmailValidatorService, ApiService]

})


export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public username: AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public User :any;
  public loading: boolean;
  public message: any;

  public submitted: boolean = false;

  constructor(fb: FormBuilder, emailValidator: EmailValidatorService,  equalPasswordsValidator: EqualPasswordValidatorService, private apiService: ApiService, private alertService: AlertService, private router: Router) {

    this.formRegister = fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator.validate])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }, {validator: equalPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.firstName = this.formRegister.controls['firstName'];
    this.lastName = this.formRegister.controls['lastName'];
    this.email = this.formRegister.controls['email'];
    this.username = this.formRegister.controls['username'];
    this.passwords = <FormGroup> this.formRegister.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

   ngOnInit() {
        this.alertService.getRegisterMessage().subscribe(message => { 
            this.message = message;
           });
}

   private extractData(res: Response) {
    this.alertService.success('Registration successful', true);
     this.router.navigate(['/login']);
  }

   private extractError(error: any) {
    this.alertService.errorRegister(error.json().message);
    this.loading = false;
   }
                                          

   onSubmit(values:Object):void {
    this.submitted = true;
    if (this.formRegister.valid) {}
    
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let url = "/register";
      let data = {
        "firstName": this.formRegister.value.firstName,
        "lastName": this.formRegister.value.lastName,
        "email": this.formRegister.value.email,
        "username": this.formRegister.value.username,
        "password": this.formRegister.controls['passwords'].value.password
      }
      this.loading = true;
      return this.apiService.post(options, data, url).then(this.extractData.bind(this))
                                                              .catch(this.extractError.bind(this));
   }
 }