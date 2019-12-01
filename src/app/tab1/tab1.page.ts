import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private googlePlus: GooglePlus,
               private fb: Facebook,
               private navCtrl: NavController) {}
  
  logOut() {
    this.googlePlus.logout();
    this.fb.logout();
    this.navCtrl.navigateForward('login');
  }

}
