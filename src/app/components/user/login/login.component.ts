import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from "../../../services/user.service.client";
import {Routes, RouterModule,ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  //properties
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';
  constructor(private userService: UserService,private route: ActivatedRoute,
            private router: Router) {}

  ngOnInit() { }
  login() {
      //hide error msg if already there
      this.errorFlag = false;
      // fetching data from loginForm
      this.username = this.loginForm.value.username;
      this.password = this.loginForm.value.password;
      let user = this.userService.findUserByCredentials(this.username,this.password);
      if(user==undefined){
        this.errorFlag = true;
      }else{
        //redirect to profile
        this.router.navigate(['/user',user._id]);
      }
    }

}
