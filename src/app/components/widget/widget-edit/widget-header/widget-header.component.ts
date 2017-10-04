import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";

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
	this.widgetSize = eval(this.widget["size"]);

  }

}
