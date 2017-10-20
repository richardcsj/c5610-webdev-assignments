import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

// injecting service into module
@Injectable()
export class WidgetService {


  constructor(private _http: Http) {

  }

  baseUrl = environment.baseUrl;

  createWidget(pageId: string, widget: any) {
    return this._http.post(this.baseUrl + '/api/page/'+pageId+'/widget',{widget: widget})
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }

  findWidgetsByPageId(pageId: string) {
    return this._http.get(this.baseUrl + '/api/page/'+pageId+'/widget')
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }

  findWidgetById(widgetId: string) {
    return this._http.get(this.baseUrl + '/api/widget/'+widgetId)
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }

  updateWidget(widgetId: string, widget: any) {
    return this._http.put(this.baseUrl + '/api/widget/'+widgetId,{widget:widget})
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }

  deleteWidget(widgetId: string) {
    return this._http.delete(this.baseUrl + '/api/widget/'+widgetId)
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }
}


