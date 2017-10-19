import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId:string;
  user:any;
  username:string;
  email:string;
  firstName:string;
  lastName:string;
  messageFlag:boolean;
  message = 'profile is updated !';
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.userId = params['userId'];
		}
	);
	this.userService.findUserById(this.userId)
  .subscribe(
    (user:any)=>{
      this.user = user;
      this.username = this.user['username'];
      this.email = this.user['email'];
      this.firstName = this.user['firstName'];
      this.lastName = this.user['lastName'];
    },
    (error:any)=>{
      console.log(error);

    }
    );
	
	}
  updateEmail(){
    this.user['email'] = this.email;
    this.userService.updateUser(this.userId,this.user).subscribe(res => console.log(res));
    this.messageFlag = true;
  }
  updateUserName(){
    this.user['username'] = this.username;
    this.userService.updateUser(this.userId,this.user).subscribe(res => console.log(res));
    this.messageFlag = true;
  }
  updateFirstName(){
    this.user['firstName'] = this.firstName;
    this.userService.updateUser(this.userId,this.user).subscribe(res => console.log(res));
    this.messageFlag = true;
  }
  updateLastName(){
    this.user['lastName'] = this.lastName;
    this.userService.updateUser(this.userId,this.user).subscribe(res => console.log(res));
    this.messageFlag = true;
  }
}

