import { Injectable } from '@angular/core';
import {finalize, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  constructor(private http: HTTP, private loaderService: LoaderService) { }

  public get = (url: string, params?: any, options?: any): Observable<any> => {
    options = this.prepareOptions(options);
    options.params = params;
    return of(this.http.get(url,{}, options)).pipe(tap((res) => {
      this.hideLoader();
    }), finalize(() => {
      this.hideLoader();
    }));
  }

  public post = (url: string, body: any, options?: any): Observable<any> => {
    options = this.prepareOptions(options);

    return of(this.http.post(url, body, options)).pipe(tap((res) => {
      this.hideLoader();
    }), finalize(() => {
      this.hideLoader();
    }));

  }

  public prepareOptions(options: any): any {
    this.showLoader();
    const token = null;
    options = options || {};

    if (!options.headers) {
      options.headers = {} as any;
    }

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    // options.withCredentials = true;
    options.headers['Accept-Language'] = 'en-Us';
    options.headers['cache-control'] = 'no-cache';
    if (!options.headers['Content-Type']) {
      options.headers['Content-Type'] = 'application/json';
    }
    if (options.headers['Content-Type'] === 'multipart/form-data') {
      delete options.headers['Content-Type'];
    }
    if (!options.headers['Accept']) {
      options.headers['Accept'] = 'application/json';
    }
    options.headers = new HttpHeaders(options.headers);
    return options;
  }

  private showLoader(): void {
    this.loaderService.show();
 }

 private hideLoader(): void {
    this.loaderService.hide();
 }
}
