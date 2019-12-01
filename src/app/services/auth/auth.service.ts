import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpProvider } from 'src/app/providers/http/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpProvider) {}


  // API End Point /Account/login/facebook

  loginWithFacebook(accessToken, deviceId, deviceName) {
    const endPoint = environment.apiEndPoint + '/Account/login/facebook';
    const request = {
      token: accessToken,
      deviceId: deviceId,
      deviceName: deviceName

    };

    return this.http.http.post(
      endPoint,
      request
    );
  }

    // API End Point /Account/login/google (We should remove Redundant Calls If Required)
    loginWithGoogle(accessToken, deviceId, deviceName) {
      const endPoint = environment.apiEndPoint + '/Account/login/google';
      const request = {
        token: accessToken,
        deviceId: deviceId,
        deviceName: deviceName
  
      };
  
      return this.http.http.post(
        endPoint,
        request
      );
    }


}
