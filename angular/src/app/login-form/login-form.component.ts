import { Component, OnInit } from '@angular/core';
import {Login} from '../login';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from './login.servie';
import { AuthServiceService} from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginid:number;
  form:FormGroup;
  loginUser: Login={} as any;
  constructor(private router: Router,private auth: AuthServiceService,private toastr :ToastrService,
    private ser:LoginService) { }

  ngOnInit() {
    this.form =new FormGroup({
      name: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      pass: new FormControl('',[Validators.required])
  })
  }
  validate(form :any)
  {
    this.loginUser={username:this.form.get('name').value, pass:this.form.get('pass').value}
      this.ser.checklogin(this.loginUser)
      .subscribe(
        (response) =>{ this.loginid= +response
                        if(this.loginid!==0 ){
                          this.auth.sendToken(this.loginUser.username);
                          sessionStorage.setItem('userid', this.loginid.toString());
                          sessionStorage.setItem('username',this.loginUser.username);
                          this.router.navigateByUrl('/dashboard/eventlist')
                          this.toastr.success('Success', "Logged In Successfully");}
                          else{
                            this.toastr.error('Incorrect username or password', "Logged In Failed");
                          }
                        },
        (error) =>console.log(error)
      );
  }
}
