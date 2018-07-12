import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiQuery } from '../../library/api-query';
import { Http } from '@angular/http';

/*
 Generated class for the Page page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-page',
    templateUrl: 'page.html'
})
export class PagePage {

    page: { pageTitle: any, pageBody: any };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public http: Http,
        public api: ApiQuery) {

        let id = navParams.get('id');

        this.http.get( api.url+'/page/' + id, this.api.setHeaders(false) ).subscribe(data => {
            this.page = data.json();
        });
    }

    back() {
        this.navCtrl.pop();
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad PagePage');
    }

}
