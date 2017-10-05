import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WidgetService} from "../../../../services/widget.service.client";

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
	this.widgetTitle = this.widget["title"];
	this.widgetUrl = this.widget["url"];
	this.widgetWidth = this.widget["width"];
  }

}
