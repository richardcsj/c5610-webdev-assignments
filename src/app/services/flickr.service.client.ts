import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

// injecting service into module
@Injectable()
export class FlickrService {

key = "4a05f975ad8acd6355938ffdfc163a83";
secret = "9a6cf6fee4f48364";
urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

constructor(private _http: Http) {}

searchPhotos(searchTerm: any) {
 const url = this.urlBase
   .replace('API_KEY', this.key)
   .replace('TEXT', searchTerm);
 return this._http.get(url);
}  

}


