import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {Router} from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {PasswordValidator} from '../../validators/password.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
            // password: new FormControl('', Validators.compose([
            //   Validators.minLength(6),
            //   Validators.required
            // ])),
            // confirm: new FormControl('', Validators.compose([
            //   Validators.minLength(6),
            //   Validators.required
            // ])),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            phonNumber: new FormControl('', Validators.required),
            IsMarketingEmailsAllowed: new FormControl(false, Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            matchingPasswords: this.matchingPasswordGroup,
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


    register(form) {
        this.presentLoading();
        const request = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.matchingPasswords.password,
            phonNumber: form.phonNumber,
            acceptsMarketingEmail: form.IsMarketingEmailsAllowed
        };
        this.authService.register(request).subscribe((res) => {
            if (res && res.error) {
                this.loading.dismiss();
                alert(res.error.errorMessage);
            } else {
                this.loading.dismiss();
                this.router.navigateByUrl('tabs/tab1');
            }
        });
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Loading'
        });
        await this.loading.present();
    }

}
