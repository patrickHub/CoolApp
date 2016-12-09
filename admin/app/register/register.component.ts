import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EqualPasswordsValidator} from '../services/validators/equalPassword.Validator.service';
import {EmailValidator} from '../services/validators/email.validator.service';



@Component({

  templateUrl: 'app/register/register.component.html',
  styleUrls: ['app/register/register.component.scss'],
 
  providers: [EqualPasswordsValidator, EmailValidator],

})


export class RegisterComponent {

  public formRegister: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public username: AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted: boolean = false;

  constructor(fb: FormBuilder, emailValidator: EmailValidator,  equalPasswordsValidator: EqualPasswordsValidator) {

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

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.formRegister.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}
