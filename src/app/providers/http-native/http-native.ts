import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';

import { from } from 'rxjs';

@Injectable()
export class HttpNativeProvider {
    constructor(public http: HTTP) {}

    public get(url, params?: any, options: any = {}) {
        const responseData = this.http.get(url, params, {})
            .then(resp => options.responseType === 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData);
    }

    public post(url, params?: any, options: any = {}) {
        const responseData = this.http.post(url, params, {})
            .then(resp => options.responseType === 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData);
    }
}
