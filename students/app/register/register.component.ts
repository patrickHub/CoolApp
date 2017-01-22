import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {ApiService} from '../services/api.service/api.service';
import{ AlertService } from '../services/alert.service/alert.service';



@Component({

  templateUrl: 'app/register/register.component.html',
  styleUrls: ['app/register/register.component.scss'],
 
  providers: [ApiService]

})


export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;
  public fullName: AbstractControl;
  public User :any;
  public loading: boolean;
  public message: any;

  public submitted: boolean = false;

  constructor(fb: FormBuilder, private apiService: ApiService, private alertService: AlertService, private router: Router) {

    this.formRegister = fb.group({
      'fullName': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.fullName = this.formRegister.controls['fullName'];
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
      let url = "/api/student/register";
      let data = {
        "fullName": this.formRegister.value.fullName
      }
      console.log("data\n" + data);
      this.loading = true;
      return this.apiService.post(options, data, url).then(this.extractData.bind(this))
                                                              .catch(this.extractError.bind(this));
   }
 }