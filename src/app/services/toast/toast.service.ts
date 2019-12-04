import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toast: ToastController
  ) { }

  async presentToast(message, color = 'primary') {
    const toast = await this.toast.create({
      message: message,
      color: color,
      duration: 2000,
    });
    toast.present();
  }
}
