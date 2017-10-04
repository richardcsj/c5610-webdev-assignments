import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../services/widget.service.client";
import {ActivatedRoute} from "@angular/router";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  	pageId : string;
	widgets:any[]=[{}];
  constructor(private widgetService : WidgetService, private activatedRoute:ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.activatedRoute.params
		.subscribe(
			(params: any) => {
				this.pageId = params['pid'];
			}
		);
		this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
		for (let x = 0; x<this.widgets.length;x++){
			this.widgets[x]['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.widgets[x]['url']);

  		}
  	}
}
