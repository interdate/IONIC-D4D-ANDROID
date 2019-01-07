import {Component} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {AlertController, LoadingController, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';

@Component({
    templateUrl: 'api.html'
})
export class ApiQuery {

    url: any;
    header: RequestOptions;
    public response: any;
    username: any;
    password: any;
    storageRes: any;
    version: any = '1.1.8';
    signupData: {  username: any, password: any };
    loading: any;

    constructor(public storage: Storage,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public http: Http) {
       //this.url = 'http://localhost:8100';
        this.url = 'http://m.dating4disabled.com/api/v7';
        this.storage.get('user_id').then((val) => {
            this.storage.get('username').then((username) => {
                this.username = username;
            });
            this.storage.get('password').then((password) => {
                this.password = password;
            });
        });
        this.storage = storage;
    }

    presentToast(txt, duration = 3000) {
        let toast = this.toastCtrl.create({
            message: txt,
            duration: duration,
        });

        toast.present();
    }

    showLoad(txt = 'Please wait...') {
        this.loading = this.loadingCtrl.create({
            content: txt
        });

        this.loading.present();
    }

    hideLoad() {
        if (!this.isLoaderUndefined())
            this.loading.dismiss();
        this.loading = undefined;
    }

    isLoaderUndefined(): boolean {
        return (this.loading == null || this.loading == undefined);
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
        for (var i = 0; i < arraytosearch.length; i++) {
            if (arraytosearch[i][key] == valuetosearch) {
                return i;
            }
        }
        return null;
    } 

    sendPhoneId(idPhone) {
        let data = JSON.stringify({deviceId: idPhone});
        this.http.post(this.url + '/user/deviceId/OS:Android', data, this.setHeaders(true)).subscribe(data => {
        });
    }

    setUserData(data) {
        this.setStorageData({label: 'username', value: data.username});
        this.setStorageData({label: 'password', value: data.password});
    }

    setStorageData(data) {
        this.storage.set(data.label, data.value);
    }

    getUserData() {
        this.storage.get('user_id').then((val) => {
            this.storage.get('username').then((username) => {
                this.username = username;
            });
            this.storage.get('password').then((password) => {
                this.password = password;
            });
        });
        return {username: this.username, password: this.password}
    }

    setHeaders(is_auth = false, username = false, password = false, register = "0") {

        if (username != false) {
            this.username = username;
        }

        if (password != false) {
            this.password = password;
        }

        let myHeaders: Headers = new Headers;

        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('Accept', '*/*');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append("appVersion", this.version);

        if (is_auth == true) {
            myHeaders.append("Authorization", "Basic " + btoa(this.username + ':' + this.password));
        }

        myHeaders.append("register", register);

        this.header = new RequestOptions({
            headers: myHeaders
        });
        return this.header;
    }

    ngAfterViewInit() {
        this.storage.get('user_id').then((val) => {
            this.storage.get('username').then((username) => {
                this.username = username;
            });
            this.storage.get('password').then((password) => {
                this.password = password;
            });
        });
    }
}
