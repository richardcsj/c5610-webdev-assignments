import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from "../../../services/user.service.client";
import {Routes, RouterModule,ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  //properties
  username: string;
  password: string;
  pwdconfirmation: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username!';
  constructor(private userService: UserService,private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
  }
  register() {
      //hide error msg if already there
      this.errorFlag = false;
      // fetching data from registerForm
      this.username = this.registerForm.value.username;
      this.password = this.registerForm.value.password;
      this.pwdconfirmation = this.registerForm.value.pwdconfirmation;
      this.userService.findUserByUsername(this.username)
      .subscribe(
        (user:any)=> {
            this.errorFlag = true;
            this.errorMsg = "The username is already taken";
        },
        (error:any)=>{
          if(this.password == this.pwdconfirmation){
              let user = {_id: "", username: this.username, password: this.password, firstName: "", lastName: ""};
              this.userService.createUser(user)
              .subscribe(
                (newUser:any)=>{
                  //redirect to profile
                  this.router.navigate(['/user',newUser._id]);
                },
                (error:any)=>{
                  this.errorFlag = true;
                  this.errorMsg = "Couldn't create user";
                }
                );
            }else{
              this.errorFlag = true;
              this.errorMsg = "password and password confirmation are not the same";
            }
        }
        );
    }

}
