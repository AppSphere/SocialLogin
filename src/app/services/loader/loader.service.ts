import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loaderInstance: LoadingController;

    constructor(public loader: LoadingController) {

    }


    public async show() {
        const loader = await this.loader.create();
        await loader.present();
    }

    public hide() {
        this.loader.dismiss();
    }


}
