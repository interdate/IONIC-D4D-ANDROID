import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Nav, ToastController, Content, LoadingController} from 'ionic-angular';
import {FullScreenProfilePage} from '../full-screen-profile/full-screen-profile';
import {DialogPage} from '../dialog/dialog';
import {Http} from '@angular/http';
import {ApiQuery} from '../../library/api-query';
import {Storage} from '@ionic/storage';

/*
 Generated class for the Profile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $: any;

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    @ViewChild(Content) content: Content;
    @ViewChild(Nav) nav: Nav;

    isAbuseOpen: any = false;

    user: { id: any, isAddFavorite: any, userId: any, nickName: any, mainImage: {url: any}, isBlackListed: any, about: { label: any }, photos: any, photo: any, url: any, region: any, sexPreference: any } = {
        id: '',
        isAddFavorite: '',
        userId: '',
        isBlackListed: false,
        nickName: '',
        about: {label: ''},
        photos: '',
        photo: '',
        url: '',
        region: '',
        sexPreference: '',
        mainImage: {url: ''},
    };

    texts: { lock: any, unlock: any } = {lock: '', unlock: ''};

    formReportAbuse: { title: any, buttons: { cancel: any, submit: any }, text: { label: any, name: any, value: any } } =
    {title: '', buttons: {cancel: '', submit: ''}, text: {label: '', name: '', value: ''}};

    myId: any = false;

    constructor(public toastCtrl: ToastController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public loadingCtrl: LoadingController,
                public api: ApiQuery,
                public storage: Storage) {

        this.storage = storage;

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        //loading.present();

        var user = navParams.get('user');

        if (user) {

            this.user = user;

            this.http.get(api.url + '/user/profile/' + this.user.id, api.setHeaders(true)).subscribe(data => {
                this.user = data.json();
                loading.dismiss();
            });
        } else {
            this.storage.get('user_id').then((val) => {

                if (val) {
                    this.myId = val;
                    this.user.id = val;
                    this.http.get(api.url + '/user/profile/' + this.user.id, api.setHeaders(true)).subscribe(data => {
                        this.user = data.json();
                        loading.dismiss();
                    });
                }
            });
        }
    }

    back() {
        this.navCtrl.pop();
    }

    scrollToBottom() {
        this.content.scrollTo(0, this.content.getContentDimensions().scrollHeight, 300);
    }

    addFavorites(user) {
        user.isAddFavorite = true;
        let toast = this.toastCtrl.create({
            message: user.nickName + ' ' + 'has been added to Favorites',
            duration: 2000
        });

        toast.present();

        let params = JSON.stringify({
            list: 'Favorite',
        });

        this.http.post(this.api.url + '/user/favorites/' + user.userId, params, this.api.setHeaders(true)).subscribe(data => {
            console.log(data);
        });
    }

    blockSubmit() {
        if (this.user.isBlackListed == true) {
            this.user.isBlackListed = false;
            var url = this.api.url + '/user/blacklist/' + this.user.userId+'/delete';
            var message = 'The user has been removed from your black list';
        } else {
            this.user.isBlackListed = true;
            var  url = this.api.url + '/user/blacklist/' + this.user.userId;
            var message = 'The user has been added to your black list';
        }


        this.http.post(url, {}, this.api.setHeaders(true)).subscribe(data => {
            let toast = this.toastCtrl.create({
                message: message,
                duration: 2000
            });

            toast.present();

        });
    }

    addLike(user) {
        user.isAddLike = true;
        let toast = this.toastCtrl.create({
            message: user.nickName + ' ' + 'has been liked',
            duration: 2000
        });

        toast.present();

        this.http.post(this.api.url + '/user/like/' + user.userId, {}, this.api.setHeaders(true)).subscribe(data => {
            console.log(data);
        });

    }

    fullPagePhotos() {
        this.navCtrl.push(FullScreenProfilePage, {
            user: this.user
        });
    }

    toDialog(user) {
        this.navCtrl.push(DialogPage, {
            user: { id: user.userId, nickName: user.nickName, mainImage: { url: user.mainImage.url } }
        });
    }

    reportAbuseShow() {
        this.isAbuseOpen = true;
        this.scrollToBottom();
    }

    reportAbuseClose() {
        this.isAbuseOpen = false;
        this.formReportAbuse.text.value = "";
    }

    abuseSubmit() {

        let params = JSON.stringify({
            abuseMessage: this.formReportAbuse.text.value,
        });

        this.http.post(this.api.url + '/user/abuse/' + this.user.userId, params, this.api.setHeaders(true)).subscribe(data => {

            let toast = this.toastCtrl.create({
                message: 'Thank you. The message has been sent',
                duration: 2000
            });

            toast.present();
        });
        this.reportAbuseClose();
    }

}
