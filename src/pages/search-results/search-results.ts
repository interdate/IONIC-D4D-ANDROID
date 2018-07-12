import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {NavController, NavParams, LoadingController, ToastController, Events} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {ProfilePage} from '../profile/profile';
import {DialogPage} from '../dialog/dialog';
import 'rxjs/add/operator/map';

@Component({
    selector: 'search-results',
    templateUrl: 'search-results.html'
})
export class SearchResultsPage {

    list: any;
    action: any;
    offset: any;
    sort: any = '';
    page_counter: any = 1;
    per_page: any = 10;
    user_counter: any = 10;
    loader: any = true;
    username: any;
    password: any;
    blocked_img: any = false;
    get_params: { page: any, count: any } = {page: 1, count: 10};
    url: any = false;

    users: Array<{ id: string, distance: string, city: string, isPaying: string, isOnline: string, isAddBlackListed: string, nickName: string,
        mainImage: { url: any }, age: string, region_name: string, image: string, about: {}, component: any}>;
    params: { action: any, page: any, list: any } = {action: 'online', page: 1, list: ''};

    constructor(public toastCtrl: ToastController,
                public loadingCtrl: LoadingController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery,
                public events: Events,
                public storage: Storage) {

        this.get_params = this.navParams.get('params');
        this.get_params = JSON.parse(String(this.get_params));

        this.page_counter = 1;

        this.storage.get('username').then((username) => {
            this.username = username;
            this.getUsers();
        });


        this.storage.get('password').then((password) => {
            this.password = password;
        });

    }

    itemTapped(user) {

        this.navCtrl.push(ProfilePage, {
            user: user
        });
    }

    toDialog(user) {
        this.navCtrl.push(DialogPage, {
            user: user
        });
    }

    back() {
        this.navCtrl.pop();
    }

    addLike(user) {

        if (user.isAddLike == false) {

            user.isAddLike = true;

            let toast = this.toastCtrl.create({
                message: 'You liked user',
                duration: 2000
            });

            toast.present();

            let params = JSON.stringify({
                toUser: user.id,
            });
            this.http.post(this.api.url + '/user/like/' + user.id, params, this.api.setHeaders(true, this.username, this.password)).subscribe(data => {
            });
        }
    }

    block(user, bool) {

        let toast;

        if (bool == true) {
            user.isBlackListed = true;

            var url = this.api.url + '/user/favorites/' + user.id + '/delete';
        }

        if (bool == false) {

            user.isBlackListed = false;

            var url = this.api.url + '/user/blacklist/' + user.id + '/delete';

            var message = 'The user has been removed from your black list';

        }

        // Remove user from list
        this.users.splice(this.users.indexOf(user), 1);
        this.events.publish('statistics:updated');

        this.http.post(url, {}, this.api.setHeaders(true)).subscribe(data => {
            toast = this.toastCtrl.create({
                message: message,
                duration: 2000
            });
            toast.present();
        });
    }

    addFavorites(user) {

        if (user.isAddFavorite == false) {

            user.isAddFavorite = true;

            let toast = this.toastCtrl.create({
                message: 'The user has been added to Favorites',
                duration: 2000
            });

            toast.present();

            let params = JSON.stringify({
                list: 'Favorite'
            });

            this.http.post(this.api.url + '/user/favorites/' + user.id, params, this.api.setHeaders(true, this.username, this.password)).subscribe(data => {
                this.events.publish('statistics:updated');
            });
        }
    }

    getUsers() {

        this.api.showLoad();

        this.url = '/user/advanced/search';

        console.log('PARAMS', this.get_params);

        this.http.post(this.api.url + this.url + '', this.get_params, this.api.setHeaders(true)).subscribe(data => {
            this.users = data.json().users;
            this.user_counter = data.json().users.itemsNumber;
            if (data.json().users.length < 10) {
                this.loader = false;
            }

            this.api.hideLoad();

        });
    }

    moreUsers(infiniteScroll: any) {
        //alert(this.loader);
        if (this.loader == true) {
            this.loader = false;
            this.page_counter++;
            this.get_params.page = this.page_counter;
            this.get_params.count = this.per_page;

            this.url = '/user/advanced/search';

            this.http.post(this.api.url + this.url + '', this.get_params, this.api.setHeaders(true)).subscribe(data => {
                if (data.json().users.length < 10) {
                    this.loader = false;
                }else{
                    this.loader = true;
                }
                //alert(this.loader);
                for (let person of data.json().users) {
                    this.users.push(person);
                }
            });
        }
        infiniteScroll.complete();
    }
}
