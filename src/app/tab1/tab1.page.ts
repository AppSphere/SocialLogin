import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NavController, Platform} from '@ionic/angular';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private googlePlus: GooglePlus,
               private fb: Facebook,
               private navCtrl: NavController,
               private platform: Platform,
               private auth: AuthService,
               private cookieService: CookieService) {}

  logOut() {

    if (this.platform.is('cordova')) {
      this.googlePlus.logout();
      this.fb.logout();
      this.navCtrl.navigateForward('login');
      } else {
        this.auth.signOut().then(x => {

          this.cookieService.deleteAll();
          this.navCtrl.navigateForward('login');
          // tslint:disable-next-line: max-line-length
          //document.location.href = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://localhost:8100';
        });

      }



  }

}
