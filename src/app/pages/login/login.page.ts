import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { LinkedIn } from 'ng2-cordova-oauth/core';
import { environment } from 'src/environments/environment';
import { OauthBrowser } from 'ng2-cordova-oauth/platform/browser';
import { LinkedinService } from 'src/app/services/linkedin/linkedin.service';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import {AuthService as LocalAuthService} from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user: SocialUser;
  private loading: any;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private platform: Platform,
    private linkedinService: LinkedinService,
    private auth: AuthService,
    public navCtrl: NavController,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private localAuthService: LocalAuthService

  ) { }

  ngOnInit() { }

  linkedInLogin() {
    this.presentLoading();
    const provider = new LinkedIn({
      clientId: environment.linkedinClientId,
      appScope: ['r_emailaddress', 'r_liteprofile'],
      redirectUri: 'https://localhost:8100/callback',
      responseType: 'code',
      state: this.linkedinService.getRandomState()
    });
    const oauth = new OauthBrowser();

    this.platform.ready().then(() => {
      oauth
        .logInVia(provider)
        .then(success => {

          debugger;
          this.linkedinService.getAccessToken(success['code'])
            .then(data => {
              alert('data' + data);
              debugger;
            });

        })
        .catch(err => {
          this.loading.dismiss();
          console.error(err);
          // this.showAlert('Error', 'Something went wrong');
        });
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading'
    });
    await this.loading.present();
  }

  // AP --- Google Login
  signInWithGoogle() {
    this.googlePlus.login({})
      .then(res => {
        //this.localAuthService.loginWithFacebook(res.accessToken, 'Device1', 'Device2');
        this.navCtrl.navigateForward('tabs');
       })
      .catch(err => console.error(err));

  }

  // AP --- Facebook Login
  signInWithFB() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.navCtrl.navigateForward('tabs');
          //this.localAuthService.loginWithFacebook(res.authResponse.accessToken, 'Device1', 'Device2');
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  
  signOut(): void {
    //
    this.googlePlus.logout();
    this.fb.logout();
    this.navCtrl.navigateForward('login');
    //this.auth.signOut();
  }
}
