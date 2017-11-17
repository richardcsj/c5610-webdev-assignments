import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
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
	msgFlag:boolean;
	msg:string;
  errorFlag: boolean;
  nameUpdated:boolean;
  errorMsg = 'Page Name is mandatory';
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.activatedRoute.params
    	.subscribe(
    		(params: any) => {
    		this.pageId = params['pid'];
    		} 
	   );
	this.pageService.findPageById(this.pageId)
		.subscribe(
			(page:any)=>{
				this.page = page;
				this.pageName = this.page["name"];
				this.pageTitle = this.page["title"];
			},
			(error:any)=>{
				console.log(error);
			}
		);
  }
  updateName(){
    this.nameUpdated = true;
  	this.msgFlag = false;
  	if(this.pageName != this.page['name']){
      if(this.pageName == ''){
        this.errorFlag = true;
      }else{
        this.errorFlag = false;
    		this.page['name'] = this.pageName;
    		this.pageService.updatePage(this.pageId,this.page)
    			.subscribe(
    				(res:any)=>{
    					this.msgFlag = true;
    					this.msg = "Page name updated !";
    				},
    				(error:any)=>{
    					console.log(error);
    				}
    			)
      }
  	}

  }
  updateTitle(){
  	this.msgFlag = false;
  	if(this.pageTitle != this.page['title']){
  		this.page['title'] = this.pageTitle;
  		this.pageService.updatePage(this.pageId,this.page)
  			.subscribe(
  				(res:any)=>{
  					this.msgFlag = true;
  					this.msg = "Page title updated !";
  				},
  				(error:any)=>{
  					console.log(error);
  				}
  			)
  	}

  }
  ok(){
    if(this.pageName!=''){
      this.router.navigate(['../'],{relativeTo:this.activatedRoute});
    }else{
      this.nameUpdated = true;
      this.errorFlag = true;
    }
  }
  deletePage(){
    this.pageService.deletePage(this.pageId)
      .subscribe(
        (res:any)=>{
          this.router.navigate(['../'],{relativeTo:this.activatedRoute});
        },
        (error:any)=>{

        }
      )
  }

}
