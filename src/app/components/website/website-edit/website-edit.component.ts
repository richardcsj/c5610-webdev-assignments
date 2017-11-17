import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

	userId:string;
	website:any;
	websiteId:string;
	websiteName:string;
	description:string;
	nameUpdated:boolean;
	errorFlag : boolean;
	errorMsg = "No website for particular id";
	messageFlag:boolean;
	message:string;
	websites: any[] = [{}];
  constructor(private websiteService: WebsiteService, 
  			 private activatedRoute: ActivatedRoute,
  			 private router:Router) { }

  ngOnInit() {
  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.userId = params['userId'];
		this.websiteId = params['wid'];
		} 
	);
	this.websiteService.findWebsiteById(this.websiteId)
	.subscribe(
		(website:any) => {
			this.errorFlag = false;
			this.website = website;
			this.websiteName  = this.website['name'];
			this.description = this.website['description'];
		},
		(error:any) => {
			this.errorFlag = true;
		}

		);
	this.websiteService.findWebsitesByUser(this.userId).
		subscribe(
			(websites:any)=>{
				this.websites = websites;
			},
			(error:any)=>{
				console.log(error);
			}
		);
	}
	deleteWbesite(){
		this.websiteService.deleteWebsite(this.websiteId).subscribe(
			(res:any) => {this.router.navigate(["../"],{relativeTo: this.activatedRoute})},
			(error:any) => {console.log(error)}

			);
	}
	updateName(){
		this.errorFlag = false;
		this.messageFlag = false;
		this.nameUpdated = true;
		if(this.website['name'] != this.websiteName){
			if(this.websiteName==''){
				this.errorFlag = true;
				this.errorMsg = "Website name is mandatory";

			}else{
				this.website['name'] = this.websiteName;
				this.websiteService.updateWebsite(this.websiteId,this.website)
					.subscribe(
						(res:any)=>{
							this.messageFlag = true;
							this.message = 'Website name is updated !';
							},
						(error:any)=>{
							this.errorFlag = true;
							this.errorMsg = 'Cannot update website name';
						}
				);
			}
			
		}
		
	}
	updateDescription(){
		this.errorFlag = false;
		this.messageFlag = false;
		if(this.website['description'] != this.description){
			this.website['description'] = this.description;
			this.websiteService.updateWebsite(this.websiteId,this.website)
				.subscribe(
					(res:any)=>{
						this.messageFlag = true;
						this.message = 'Website description is updated !';
						},
					(error:any)=>{
						this.errorFlag = true;
						this.errorMsg = 'Cannot update website description';
					}
				);
		}
	}

}
