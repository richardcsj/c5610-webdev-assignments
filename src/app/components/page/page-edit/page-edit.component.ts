import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageService} from "../../../services/page.service.client";


@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

	pageId:string;
	page:any;
	pageName:string;
	pageTitle:string;
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.pageId = params['pid'];
		} 
	);
	this.page = this.pageService.findPageById(this.pageId);
	this.pageName = this.page["name"];
	this.pageTitle = this.page["description"];
  }

}
