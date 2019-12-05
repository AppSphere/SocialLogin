import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { LinkedIn } from 'ng2-cordova-oauth/core';
import { environment } from 'src/environments/environment';
import { OauthBrowser } from 'ng2-cordova-oauth/platform/browser';
import { LinkedinService } from 'src/app/services/linkedin/linkedin.service';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AuthService as LocalAuthService } from 'src/app/services/auth/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  validationsForms: FormGroup;
  validationMessages: any;
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
    private localAuthService: LocalAuthService,
    public formBuilder: FormBuilder,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.validationsForms = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
      ])),
    });


    this.validationMessages = {
      username: [
          {type: 'required', message: 'Username is required.'},
          {type: 'minlength', message: 'Username must be at least 5 characters long.'},
          {type: 'maxlength', message: 'Username cannot be more than 25 characters long.'},
          {type: 'pattern', message: 'Your username must contain only numbers and letters.'},
          {type: 'validUsername', message: 'Your username has already been taken.'}
      ],
      name: [
          {type: 'required', message: 'Name is required.'}
      ],
      lastname: [
          {type: 'required', message: 'Last name is required.'}
      ],
      email: [
          {type: 'required', message: 'Email is required.'},
          {type: 'pattern', message: 'Enter a valid email.'}
      ],
      phone: [
          {type: 'required', message: 'Phone is required.'},
          {type: 'validCountryPhone', message: 'Phone incorrect for the country selected'}
      ],
      password: [
          {type: 'required', message: 'Password is required.'},
          {type: 'minlength', message: 'Password must be at least 5 characters long.'},
          {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'}
      ],
      confirm: [
          {type: 'required', message: 'Confirm password is required'}
      ],
      matchingPasswords: [
          {type: 'areEqual', message: 'Password mismatch'}
      ],
      terms: [
          {type: 'pattern', message: 'You must accept terms and conditions.'}
      ],
    };
  }

  login(data) {
    this.localAuthService.login(data.email, data.password).subscribe(res => {
      debugger;
    });
  }

  linkedInLogin() {
    this.presentLoading();
    const provider = new LinkedIn({
      clientId: environment.linkedinClientId,
      appScope: ['r_emailaddress', 'r_liteprofile'],
      redirectUri: 'https://localhost:8100/callback',
      responseType: 'code',
      state: this.linkedinService.getRandomState()
    });
    const oauth = new OauthCordova();

    this.platform.ready().then(() => {
      oauth
        .logInVia(provider)
        .then(success => {
          console.log(JSON.stringify(success));
          this.linkedinService.getAccessToken(success["code"])
            .then(data => {
              console.log(data);
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

    if (!this.platform.is('cordova')) {

      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
          console.log(res);
          this.navCtrl.navigateForward('tabs/tab1');

      }).catch(err => { console.log(err); });

    } else {
        this.googlePlus.login({})
        .then(res => {
            this.navCtrl.navigateForward('tabs/tab1');
        })
        .catch(err => console.error(err));
      }

  }

  // AP --- Facebook Login
  signInWithFB() {

    if (!this.platform.is('cordova')) {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
          console.log(res);
          this.navCtrl.navigateForward('tabs/tab1');

        });
    } else {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.navCtrl.navigateForward('tabs/tab1');
      })
      .catch(e => console.log('Error logging into Facebook', e));
    }
  }

  signOut(): void {
    //
    if (!this.platform.is('cordova')) {
    this.googlePlus.logout();
    this.fb.logout();
    } else {
      this.auth.signOut();
      localStorage.clear();
    }

    this.navCtrl.navigateForward('login');

  }
}
