import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../services/widget.service.client";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  pageId : string;
  constructor(private widgetService : WidgetService, private activatedRoute:ActivatedRoute,private router : Router) { }

  ngOnInit() {
  	this.activatedRoute.params
		.subscribe(
			(params: any) => {
				this.pageId = params['pid'];
			}
		);
  }
  createWidget(widgetType:string){
  	let widget = undefined;
  	switch(widgetType){
  		case 'HEADER':
  			widget = {_id: '', widgetType: 'HEADING', pageId:this.pageId, size:0 , text: ''};break;
  		case 'IMAGE':
  			widget = {_id: '', widgetType: 'IMAGE', pageId: this.pageId, width: '',url: ''};break;
		case 'YOUTUBE':
			widget = {_id: '', widgetType: 'YOUTUBE', pageId: this.pageId, width: '', url: ''};break;

  	}
  	this.widgetService.createWidget(this.pageId,widget).subscribe(
  			(widget:any) => {
  				this.router.navigate(['..',widget._id],{relativeTo:this.activatedRoute});
  			}
  		)
  	
  }

}
