import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  	widgetId:string;
	widget:any;
	widgetName:string;
	widgetText:string;
	widgetUrl:string;
	widgetWidth:string;
  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  	this.activatedRoute.params
	.subscribe(
		(params: any) => {
		this.widgetId = params['wgid'];
		} 
	);
	this.widget = this.widgetService.findWidgetById(this.widgetId);
	this.widgetName = this.widget["name"];
	this.widgetText = this.widget["text"];
	this.widgetUrl = this.widget["url"];
	this.widgetWidth = this.widget["width"];

  }

}
