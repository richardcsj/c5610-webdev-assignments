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
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.userId = params['userId'];
		}
	);
	this.user = this.userService.findUserById(this.userId);
	this.username = this.user['username'];
	this.email = this.user['email'];
	this.firstName = this.user['firstName'];
	this.lastName = this.user['lastName'];
	}
  updateEmail(newEmail){
    this.user['email'] = newEmail;
    this.userService.updateUser(this.userId,this.user);
  }
  updateUserName(newUserName){
    this.user['username'] = newUserName;
    this.userService.updateUser(this.userId,this.user);
  }
  updateFirstName(newFirstName){
    this.user['firstName'] = newFirstName;
    this.userService.updateUser(this.userId,this.user);
  }
  updateLastName(newLastName){
    this.user['lastName'] = newLastName;
    this.userService.updateUser(this.userId,this.user);
  }
}

