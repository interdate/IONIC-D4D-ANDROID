import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, ToastController, AlertController, Events} from 'ionic-angular';
import {DialogPage} from '../dialog/dialog';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {ChangePhotosPage} from '../change-photos/change-photos';
import {NotificationsPage} from '../notifications/notifications';
import {ProfilePage} from '../profile/profile';
import {Injectable} from '@angular/core';
/*
 Generated class for the Arena page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-arena',
    templateUrl: 'arena.html'
})
@Injectable()
export class ArenaPage {

    @ViewChild(Slides) slides: Slides;
    allUsers: Array<{ id: string, nickName: string, imageId: string, age: string, area: string, imageExt: string }>;
    users: Array<{ id: string, nickName: string, imageId: string, age: string, area: string, imageExt: string }>;
    imagePath: any;
    texts: { like: string, add: string, message: string, remove: string, unblock: string, no_results: string  };
    notifications: any;
    checkNotifications: any;

    constructor(public navCtrl: NavController,
                public toastCtrl: ToastController,
                public navParams: NavParams,
                private alertCtrl: AlertController,
                public http: Http,
                public events: Events,
                public api: ApiQuery) {

        /* var that = this;

         this.checkNotifications = setInterval(function () {
         that.api.storage.get('notifications').then((notifications) => {
         that.notifications = notifications;
         console.log('UPDATE NOTIFICATIONS');
         });
         }, 10000);
         */
        //this.getStatistics();

        let user_id = 0;
        let notification_id = 0;

        if (navParams.get('user')) {
            user_id = navParams.get('user');
            notification_id = navParams.get('notification');
        }

        this.http.get(api.url + '/users/forLikes/'+user_id+'/'+notification_id, api.setHeaders(true)).subscribe(data => {

            if (data.json().userHasNoMainImage == false) {
                this.allUsers = data.json().users.items;
                this.users = [data.json().users.items[0]];
                var e = 0;
                var i: any = 0;

                for (i in this.allUsers) {
                    if (e < 50) {
                        if (i > 0) {
                            this.users.push(this.allUsers[i]);
                        }
                        this.allUsers.splice(i, 1);
                    } else {
                        break;
                    }
                    e++;
                }

                this.imagePath = data.json().users.imagesStoragePath;

            } else {

                let message = 'You need to upload at least one photo in order to enter The Arena';

                this.presentAlert(message);
                this.navCtrl.push(ChangePhotosPage);
            }
        });
    }

    presentAlert(message) {
        let alert = this.alertCtrl.create({
            message: message,
            buttons: ['ok']
        });
        alert.present();
    }

    addUsers() {
        var e = 0;
        var i: any = 0;

        for (i in this.allUsers) {
            if (e < 50) {
                this.users.push(this.allUsers[i]);
                this.allUsers.splice(i, 1);
            } else {
                break;
            }
            e++;
        }
    }

    setNotifications() {
        this.events.subscribe('user:created', (notifications) => {
            console.log('Welcome', notifications, 'at');
            this.notifications = notifications;
        });
    }

    goToSlide(str) {

        let user = this.users[this.slides.getActiveIndex()];
        let index = this.slides.getActiveIndex();


        if (str == 'like') {

            let params = JSON.stringify({
                toUser: user.id
            });

            this.http.post(this.api.url + '/user/like/' + user.id, params, this.api.setHeaders(true)).subscribe(data => {

            });

            this.users.splice(index, 1);
            this.slides.slideTo(index, 1);

        } else {


            if (this.slides.isEnd()) {
                this.slides.slideTo(0, 1);
            } else {
                this.slides.slideNext();
            }
        }
    }

    slideChanged(event) {
        if (this.slides.getActiveIndex() == this.slides.length() - 10) {
            this.addUsers();
        }
        if (this.slides.getActiveIndex() == 1) {
            console.log(this.users[this.slides.getActiveIndex()]);

            console.log(this.slides.getActiveIndex());
        }
    }

    toDialog() {
        let user = this.users[this.slides.getActiveIndex()];
        this.navCtrl.push(DialogPage, {
            user: user
        });
    }

    toProfile() {
        let user = this.users[this.slides.getActiveIndex()];
        this.navCtrl.push(ProfilePage, {
            user: user
        });
    }

    toNotifications() {
        this.navCtrl.push(NotificationsPage);
    }

    /*
     getStatistics() {
     this.http.get(this.api.url + '/api/v1/statistics', this.api.setHeaders(true)).subscribe(data => {

     let statistics = data.json().statistics;

     this.notifications = statistics.newNotificationsNumber;

     });
     }*/

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArenaPage');
    }


    ionViewWillLeave() {

        // enable the root left menu when leaving the tutorial page
        //this.app.getComponent('leftMenu').enable(true);
        // clearInterval(this.checkNotifications);
    }

}
