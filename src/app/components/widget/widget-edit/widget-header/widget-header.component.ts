import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser'


@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

	widgetId:string;
	widget:any;
	widgetName:string;
	widgetText:string;
	widgetSize:number;
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
			this.widgetSize = eval(this.widget["size"]);
		}
	);
	
  }

  updateWidget(){
  	this.widget['name'] = this.widgetName ;
  	this.widget['text'] = this.widgetText;
  	this.widget['size'] = ""+this.widgetSize;
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
