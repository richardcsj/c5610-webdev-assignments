import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

// injecting service into module
@Injectable()
export class PageService {


  constructor(private _http: Http) {

  }

  baseUrl = environment.baseUrl;

  createPage(websiteId:string, page:any) {
    return this._http.post(this.baseUrl + '/api/website/'+websiteId+'/page',{page: page})
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }

  findPageById(pageId: string) {
    return this._http.get(this.baseUrl + '/api/page/'+pageId)
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }

  findPageByWebsiteId(websiteId:string) {
    return this._http.get(this.baseUrl + '/api/website/'+websiteId+'/page')
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
    }

  updatePage(pageId: string, page: any) {
    return this._http.put(this.baseUrl + '/api/page/'+pageId,{page:page})
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }

  deletePage(pageId:string) {
    return this._http.delete(this.baseUrl + '/api/page/'+pageId)
     .map(
       (res: Response) => {
         const data = res.json();
         return data;
       }
     );
  }
}


