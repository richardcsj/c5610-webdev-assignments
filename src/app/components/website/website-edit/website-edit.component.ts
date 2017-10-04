import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.userId = params['userId'];
		this.websiteId = params['wid'];
		} 
	);
	this.website = this.websiteService.findWebsiteById(this.websiteId);
	this.websiteName  = this.website['name'];
	this.description = this.website['description'];
  }

}
