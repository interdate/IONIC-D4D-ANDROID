import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
/*
 Generated class for the Settings page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    form: any = {newMessPushNotif: '', userGetMsgToEmail: ''}

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private toastCtrl: ToastController,
                public http: Http,
                public api: ApiQuery) {

        this.http.get(api.url + '/user/settings', api.setHeaders(true)).subscribe(data => {
            //this.form = data.json().settings;
            this.form.newMessPushNotif = Boolean(parseInt(data.json().settings.newMessPushNotif));
            this.form.userGetMsgToEmail = Boolean(parseInt(data.json().settings.userGetMsgToEmail));

        });
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Saved',
            duration: 3000
        });

        toast.present();
    }

    submit(type) {

        let name;
        let value;

        if (type == 'email') {

            name = 'userGetMsgToEmail';
            value = this.form.userGetMsgToEmail;

        } else if (type == 'push') {
            name = 'newMessPushNotif';
            value = this.form.newMessPushNotif;
        }

        this.presentToast();

        this.http.post(this.api.url + '/user/settings/' + name + '/' + value, {}, this.api.setHeaders(true)).subscribe(data => {
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }

}
