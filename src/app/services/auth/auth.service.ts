import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpProvider } from 'src/app/providers/http/http';
import { TokenResponse } from 'src/app/viewmodels/token-response';
import { HttpWrapperService } from '../http-wrapper.service'
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpWrapperService) {}


  // API End Point /Account/login/facebook

  loginWithFacebook(accessToken, deviceId, deviceName) {
    const endPoint = environment.apiEndPoint + '/Account/login/facebook';
    const request = {
      token: accessToken,
      deviceId: deviceId,
      deviceName: deviceName

    };

  }

    // API End Point /Account/login/google (We should remove Redundant Calls If Required)
    loginWithGoogle(accessToken, deviceId, deviceName) {
      const endPoint = environment.apiEndPoint + '/Account/login/google';
      const request = {
        token: accessToken,
        deviceId: deviceId,
        deviceName: deviceName

      };

    
    }



    // API End Point /Account/login/google (We should remove Redundant Calls If Required)
    register(formData) {
      const endPoint = environment.apiEndPoint + '/Account/Create';

      return this.http.post(endPoint, formData).pipe(
        map((res: TokenResponse) => {
          return res;
        }),
        catchError((err) => {
               return of(err);
        })
      );
    }


}
