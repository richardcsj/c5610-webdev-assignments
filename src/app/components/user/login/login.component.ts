import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from "../../../services/user.service.client";
import {Routes, RouterModule,ActivatedRoute,Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";

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
            private router: Router,private sharedService : SharedService) {}

  ngOnInit() { }
  login() {
      // fetching data from loginForm
       this.username = this.loginForm.value.username;
       this.password = this.loginForm.value.password;

       // calling client side userservice to send login information
       console.log('data', this.username);
       this.userService.login(this.username, this.password)
         .subscribe(
           (data: any) => {
               this.sharedService.user = data;
               this.router.navigate(['/profile'])},
           (error: any) => {
               console.log(error);
           }
         );

    }
}
