import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { from } from 'rxjs';

@Injectable()
export class HttpAngularProvider {
    constructor(public http: HttpClient) {}

    public get(url: string, params?: any, options: any = {}) {
        options.params = params;
        options.withCredentials = true;
        return this.http.get(url, options).toPromise();
    }

    public post(url: string, params: any, options: any = {}) {
        // options.withCredentials = true;

        const body = this.createSearchParams(params);

        debugger;
        return this.http.post(url, body.toString(), options).toPromise();
    }

    private createSearchParams(params: any) {
        const searchParams = new URLSearchParams();
        for (const k in params) {
            if (params.hasOwnProperty(k)) {
                searchParams.set(k, params[k]);
            }
        }

        return searchParams;
    }
}
