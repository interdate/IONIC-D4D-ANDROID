import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {RegistrationOnePage} from '../registration-one/registration-one';
import {PasswordRecoveryPage} from '../password-recovery/password-recovery';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {ApiQuery} from '../../library/api-query';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ChangePhotosPage} from "../change-photos/change-photos";
//import { MyApp } from '../app/app.component';
/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    form: { errors: any, login: any } = {errors: {}, login: {username: {label: {}}, password: {label: {}}}};
    errors: any;
    header: RequestOptions;
    user: any = {id: '', name: ''};


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage,
                //public myApp: MyApp,
                public toastCtrl: ToastController) {

        /*this.http.get(api.url + '/open_api/login', api.header).subscribe(data => {
         this.form = data.json();
         this.storage.get('username').then((username) => {
         this.form.login.value = username;
         this.user.name = username;
         });

         });*/

        this.storage = storage;

        if (navParams.get('page') && navParams.get('page')._id == "logout") {
            this.api.setHeaders(false, null, null);
            // Removing data storage
            this.storage.remove('status');
            this.storage.remove('password');
            this.storage.remove('user_id');
            this.storage.remove('user_photo');


            /*this.storage.get('deviceToken').then((deviceToken) => {
             this.storage.clear();
             this.storage.set('deviceToken', deviceToken);
             });
             */
        }else if(navParams.get('user')){
            this.storage.get('user_id').then((val) => {
                this.storage.get('username').then((username) => {
                    this.form.login.username.value = username;
                });
                this.storage.get('password').then((password) => {
                    this.form.login.password.value = password;
                    //this.formSubmit();
                });

            });
        }
    }

    formSubmit() {

        this.form.login.username.value = this.user.name;
        let username = this.form.login.username.value;
        let password = this.form.login.password.value;

        if (username == "") {
            username = "nologin";
        }

        if (password == "") {
            password = "nopassword";
        }
        this.http.get(this.api.url + '/user/login', this.setHeaders()).subscribe(data => {
                this.validate(data.json());
            },
            err => {
                this.errors = err._body;
                this.storage.remove('status');
                console.log(this.errors);
                //this.api.setHeaders(true, this.form.login.username.value, this.form.login.password.value);

                //this.navCtrl.push(ChangePhotosPage, {new_user: true});
            });
    }

    setHeaders() {
        let myHeaders: Headers = new Headers;
        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('Accept', '*/*');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append("Authorization", "Basic " + btoa(this.form.login.username.value + ':' + this.form.login.password.value));
        myHeaders.append("appVersion", this.api.version);
        this.header = new RequestOptions({
            headers: myHeaders
        });
        return this.header;
    }

    validate(response) {

        if (response.userId) {

            this.storage.set('username', this.form.login.username.value);
            this.storage.set('password', this.form.login.password.value);
            this.storage.set('status', 'login');
            this.storage.set('user_id', response.userId);
            this.storage.set('user_photo', response.photo);

            this.api.setHeaders(true, this.form.login.username.value, this.form.login.password.value);

            this.navCtrl.push(HelloIonicPage, {
                params: 'login',
                username: this.form.login.username.value,
                password: this.form.login.password.value
            });
            /*
             if (response.status == "login") {
             this.navCtrl.push(HelloIonicPage, {
             params: 'login',
             username: this.form.login.username.value,
             password: this.form.login.password.value
             });

             } else if (response.status == "no_photo") {
             this.user.id = response.id;

             let toast = this.toastCtrl.create({
             message: response.texts.photoMessage,
             showCloseButton: true,
             closeButtonText: 'Ok'
             });

             toast.present();
             this.navCtrl.push(RegistrationFourPage, {
             user: this.user,
             username: this.form.login.username.value,
             password: this.form.login.password.value
             });
             }
             */
            this.storage.get('deviceToken').then((deviceToken) => {
                this.api.sendPhoneId(deviceToken);
            });
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    onRegistrationPage() {
        this.navCtrl.push(RegistrationOnePage);
    }

    onPasswordRecoveryPage() {
        this.navCtrl.push(PasswordRecoveryPage);
    }

}

