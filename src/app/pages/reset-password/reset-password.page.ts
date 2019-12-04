import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { AuthService } from 'angular4-social-login';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {PasswordValidator} from '../../validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  validationsForms: FormGroup;
  matchingPasswordGroup: FormGroup;
  validationMessages: any;
  private loading: any;

  constructor(private authService: AuthService,
              private router: Router,
              public formBuilder: FormBuilder,
              public loadingController: LoadingController) {
  }

  ngOnInit() {

      this.matchingPasswordGroup = new FormGroup({
          password: new FormControl('', Validators.compose([
              Validators.minLength(6),
              Validators.required
          ])),
          confirm: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
          return PasswordValidator.areEqual(formGroup);
      });

      this.validationsForms = this.formBuilder.group({
          email: new FormControl('', Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])),
          matchingPasswords: this.matchingPasswordGroup,
      });


      this.validationMessages = {
          email: [
              {type: 'required', message: 'Email is required.'},
              {type: 'pattern', message: 'Enter a valid email.'}
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
      };


  }


  resetPassword(form) {
      this.presentLoading();
      const request = {
          email: form.email,
          password: form.matchingPasswords.password,
      };
      // this.authService.register(request).subscribe((res) => {
      //     this.loading.dismiss();
      //     this.router.navigateByUrl('tabs');
      // });
  }

  async presentLoading() {
      this.loading = await this.loadingController.create({
          message: 'Loading'
      });
      await this.loading.present();
  }

}
