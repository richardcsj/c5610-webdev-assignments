import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";
import {SafeResourceUrl, SafeUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  	widgetId:string;
  	pageId:string;
  	websiteId:string;
  	userId:string;
	widget:any;
	widgetName:string;
	widgetText:string;
	widgetUrl:SafeResourceUrl;
	widgetWidth:string;
  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit() {

  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.widgetId = params['wgid'];
		this.pageId = params['pid'];
		this.websiteId = params['wid'];
		this.userId = params['userId'];
		} 
	);
	this.widgetService.findWidgetById(this.widgetId).subscribe(
		(widget:any)=>{
			this.widget = widget;
			this.widgetName = this.widget["name"];
			this.widgetText = this.widget["text"];
			this.widgetUrl = this.widget['url'];
			this.widgetWidth = this.widget["width"];
		}
	);
  }
  updateWidget(){
  	this.widget['name'] = this.widgetName ;
  	this.widget['text'] = this.widgetText;
  	this.widget['width'] = this.widgetWidth;
  	this.widget['url'] = this.widgetUrl;
  	this.widgetService.updateWidget(this.widgetId,this.widget)
  		.subscribe(
  			(res:any)=>{
  				this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  			}
  		)
   }
  deleteWidget(){
  this.widgetService.deleteWidget(this.widgetId).subscribe(
      (res:any)=>{
        this.router.navigate(['../'],{relativeTo:this.activatedRoute});
      }
    )
 }

}
