import { Component, OnInit } from '@angular/core';
import {Login} from '../login';
import {Register} from '../register';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterFormService} from './register-form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    form: FormGroup;
  loginUser: Login= {} as any;
  registerUser: Register= {} as any;
  constructor(private router: Router, private toastr :ToastrService, private ser1: RegisterFormService) { }
    private gender: string[];
  
    ngOnInit() {
    this.gender = ['Male', 'Female', 'Others'];
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      phone: new FormControl('', [Validators.required,Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      password: new FormControl('', [Validators.required])
})
  }

  save(form: any) {
    this.registerUser = {name: this.form.get('name').value, phone_no: this.form.get('phone').value,
     gender: this.form.get('gender').value, email: this.form.get('email').value }

    
    this.loginUser = {username: this.form.get('username').value, pass: this.form.get('password').value}

      this.ser1.create(this.loginUser, this.registerUser)
      .subscribe(
        (response) => { 
                        if  (response === "Registration successful") {
                          this.toastr.success('Success', "Registration Successful");
                          this.router.navigateByUrl('/')
                    }
                        },
        (error) => console.log(error)
      );
  }

}
