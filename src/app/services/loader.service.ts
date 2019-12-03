import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loader: LoadingController) { 
   
  }
  

  public async show()
  {
    await this.loader.create();
  }

  public hide()
  {
    if(this.loader) {
      this.loader.dismiss();
    }
  }


}
