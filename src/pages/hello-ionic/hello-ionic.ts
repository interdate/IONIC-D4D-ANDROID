import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {NavController, NavParams, LoadingController, ToastController, Events} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {ProfilePage} from '../profile/profile';
import {DialogPage} from '../dialog/dialog';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

    list: any;
    action: any;
    offset: any;
    sort: any = '';
    page_counter: any;
    per_page: any = 10;
    user_counter: any = 10;
    loader: any = true;
    username: any;
    password: any;
    blocked_img: any = false;
    get_params: { action: any, list: any,  search: { disability: any, countryCode: any, nickName: any, regionCode: any, ageFrom: any, ageTo: any } } =
    {
        action: 'online',
        list: '',
        search: {disability: '', countryCode: '', nickName: '', regionCode: '', ageFrom: '', ageTo: ''}
    };
    url: any = false;

    users: Array<{ id: string, distance: string, city: string, isOnline: string, isAddBlackListed: string, nickName: string,
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

        if (this.navParams.get('params') && this.navParams.get('params') != 'login') {
            this.get_params = this.navParams.get('params');
            this.get_params = JSON.parse(String(this.get_params));
            this.params.list = this.get_params.list;
        }

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
            this.http.post(this.api.url + '/user/like/' + user.id, params, this.api.setHeaders(true)).subscribe(data => {
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

            this.http.post(this.api.url + '/user/favorites/' + user.id, params, this.api.setHeaders(true)).subscribe(data => {
                this.events.publish('statistics:updated');
            });
        }
    }

    getUsers() {

        this.api.showLoad();

        this.url = '/users/online/count:' + this.per_page + '/page:' + this.page_counter + '/sort:';

        if (this.get_params) {

            if (this.get_params.list == 'distance') {
                this.sort = this.get_params.list;
            }

            // If Current Page Is "Block" or "Favorited", than remove "Add Favorited" button label
            if (this.get_params.list == 'blackList' || this.get_params.list == 'friends') {
                this.blocked_img = true;
            }

            if (this.get_params.action == 'search') {
                this.url = '/users/search/gender:' + '1' + '/country:' + this.get_params.search.countryCode + '/region:'
                    + this.get_params.search.regionCode + '/age:' + this.get_params.search.ageFrom + '-'
                    + this.get_params.search.ageTo + '/disability:' + this.get_params.search.disability + '/nickName:'
                    + this.get_params.search.nickName + '/count:' + this.per_page + '/page:' + this.page_counter;
            } else if (this.get_params.action == 'online') {
                this.url = '/users/online/count:' + this.per_page + '/page:' + this.page_counter + '/sort:' + this.sort;
            } else {
                this.url = '/user/statistics/' + this.get_params.list + '/count:' + this.per_page + '/page:' + this.page_counter;
            }
        }

        this.http.get(this.api.url + this.url + '', this.api.setHeaders(true)).subscribe(data => {
            this.users = data.json().users.items;
            this.user_counter = data.json().users.itemsNumber;
            if (data.json().users.items.length < 10) {
                this.loader = false;
            }

            this.api.hideLoad();

        });
    }

    moreUsers(infiniteScroll: any) {
        //alert(this.loader);
        if (this.loader) {
            this.page_counter++;
            this.params.page = this.page_counter;

            this.url = '/users/online/count:' + this.per_page + '/page:' + this.page_counter + '/sort:';

            if (this.get_params.action == 'search') {
                this.url = '/users/search/gender:' + '1' + '/country:' + this.get_params.search.countryCode + '/region:'
                    + this.get_params.search.regionCode + '/age:' + this.get_params.search.ageFrom + '-'
                    + this.get_params.search.ageTo + '/disability:' + this.get_params.search.disability + '/nickName:'
                    + this.get_params.search.nickName + '/count:' + this.per_page + '/page:' + this.page_counter;
            } else if (this.get_params.action == 'online') {
                this.url = '/users/online/count:' + this.per_page + '/page:' + this.page_counter + '/sort:'+ this.sort;
            } else {
                this.url = '/user/statistics/' + this.get_params.list + '/count:' + this.per_page + '/page:' + this.page_counter;
            }

            this.http.get(this.api.url + this.url, this.api.setHeaders(true)).subscribe(data => {
                if (data.json().users.items.length < 10) {
                    this.loader = false;
                }

                for (let person of data.json().users.items) {
                    this.users.push(person);
                }
            });

            console.log('Url:', this.url, this.users.length);

            infiniteScroll.complete();
        }
    }
}
