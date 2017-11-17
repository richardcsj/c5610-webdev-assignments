import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

	widgetId:string;
	widget:any;
	widgetName:string;
	widgetText:string;
	widgetRows:number;
	widgetPlaceholder:string;
	widgetFormatted:boolean;
    errorFlag: boolean;
  nameUpdated:boolean;
  errorMsg = 'Widget Name is mandatory';
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
			this.widgetRows = this.widget["rows"];
			this.widgetPlaceholder = this.widget["placeholder"];
			this.widgetFormatted = this.widget["formatted"];
		}
	);
  }
  updateWidget(){
    this.nameUpdated = true;
    if(this.widgetName==undefined){
      this.errorFlag = true;
    }else{
  	this.widget['name'] = this.widgetName ;
  	this.widget['text'] = this.widgetText;
  	this.widget['rows'] = this.widgetRows;
  	this.widget['placeholder'] = this.widgetPlaceholder;
  	this.widget["formatted"] = this.widgetFormatted;
  	this.widgetService.updateWidget(this.widgetId,this.widget)
  		.subscribe(
  			(res:any)=>{
  				this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  			}
  		)
    }
   }
  deleteWidget(){
  this.widgetService.deleteWidget(this.widgetId).subscribe(
      (res:any)=>{
        this.router.navigate(['../'],{relativeTo:this.activatedRoute});
      }
    )
 }

}
