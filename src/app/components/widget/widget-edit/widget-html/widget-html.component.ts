import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

	widgetId:string;
	widget:any;
	widgetName:string;
	widgetText:string;
  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,private router : Router) { }

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
			this.widgetText = this.widget["text"];
		}
	);
	
  }
  updateWidget(){
  	this.widget['name'] = this.widgetName ;
  	this.widget['text'] = this.widgetText;
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
