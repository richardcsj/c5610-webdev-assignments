import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
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
  errorFlag : boolean;
  errorMsg :string;
  messageFlag:boolean;
  message : string;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,private router:Router) { }

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
  logout() {
   this.userService.logout()
     .subscribe(
       (data: any) => this.router.navigate(['/login'])
     );
}

  updateEmail(){
    this.errorFlag = false;
    this.messageFlag = false;
    if(this.user['email'] != this.email){
      this.user['email'] = this.email;
      this.userService.updateUser(this.userId,this.user)
        .subscribe(
          (res:any) => {           
            this.messageFlag = true;
            this.message = 'email is updated';

          },
          (error:any) => {
            this.errorFlag = true;
            this.errorMsg = 'cannot update email';

          }
        );
    }
    
    
  }
  updateUserName(){
    this.errorFlag = false;
    this.messageFlag = false;
    if(this.user['username'] != this.username){
      this.user['username'] = this.username;
      this.userService.updateUser(this.userId,this.user)
        .subscribe(
          (res:any) => {           
            this.messageFlag = true;
            this.message = 'username is updated';

          },
          (error:any) => {
            this.errorFlag = true;
            this.errorMsg = 'cannot update username';

          }
        );
    }
  }
  updateFirstName(){
    this.errorFlag = false;
    this.messageFlag = false;
    if(this.user['firstName'] != this.firstName){
      this.user['firstName'] = this.firstName;
      this.userService.updateUser(this.userId,this.user)
        .subscribe(
          (res:any) => {           
            this.messageFlag = true;
            this.message = 'first name is updated';

          },
          (error:any) => {
            this.errorFlag = true;
            this.errorMsg = 'cannot update first name';

          }
        );
    }
  }
  updateLastName(){
    this.errorFlag = false;
    this.messageFlag = false;
    if(this.user['lastName'] != this.lastName){
      this.user['lastName'] = this.lastName;
      this.userService.updateUser(this.userId,this.user)
        .subscribe(
          (res:any) => {           
            this.messageFlag = true;
            this.message = 'last name is updated';

          },
          (error:any) => {
            this.errorFlag = true;
            this.errorMsg = 'cannot update last name';

          }
        );
    }
  }
}

