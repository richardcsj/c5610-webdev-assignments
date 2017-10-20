import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";
import {SafeResourceUrl, SafeUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
	widgetId:string;
	widget:any;
	widgetName:string;
	widgetTitle:string;
	widgetUrl:SafeResourceUrl;
	widgetWidth:string;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit() {
  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.widgetId = params['wgid'];
		} 
	);
	this.widgetService.findWidgetById(this.widgetId).subscribe(
		(widget:any)=>{
			this.widget = widget;
			this.widgetName = this.widget["name"];
			this.widgetTitle = this.widget["title"];
			this.widgetUrl = this.widget['url'];
			this.widgetWidth = this.widget["width"];
		}
	);

  }
  updateWidget(){
  	this.widget['name'] = this.widgetName ;
  	this.widget['title'] = this.widgetTitle;
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
