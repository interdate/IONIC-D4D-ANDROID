import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {Http} from '@angular/http';
import {ApiQuery} from '../../library/api-query';
import {AdvancedSearchPage} from "../advanced-search/advanced-search";

declare var $: any;

/*
 Generated class for the Search page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {

    age: any;
    params: { countryCode: any} = {countryCode: false};
    countries: Array<{ countryCode: any, countryName: any }>;
    regions: Array<{ regionCode: any, regionName: any }>;
    disabilities: Array<{ healthId: any, healthName: any }>;
    form: { form: any } = {
        form: {
            username: { value: '' },
            country: {value: ''},
            region: { label:'', value: ''},
            state: {value: ''},
            disability: {value: ''},
            ageFrom: {choices: [[]], label: ''},
            ageTo: {choices: [[]], label: ''},
        }
    };

    ageLower: any = 20;
    ageUpper: any = 50;

    default_range: any = {lower: this.ageLower, upper: this.ageUpper}

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery) {

        this.age = {
            'lower': this.form.form.ageFrom.value,
            'upper': this.form.form.ageTo.value
        }

        this.getCountries();
        this.getDisabilities();
        this.getDefaultRegion();
       // this.getRegion('US');
    }

    getDefaultRegion() {
        this.http.get(this.api.url + '/list/search/regions/', this.api.setHeaders(true)).subscribe(data => {
            this.regions = data.json().items;
            this.form.form.region.label = data.json().label;
            this.form.form.region.value = data.json().value;
        });
    }

    getCountries() {
        this.http.get(this.api.url + '/list/countries', this.api.setHeaders(true)).subscribe(data => {
            this.countries = data.json().items;
            this.form.form.country.value = data.json().defaultValue;
        });
    }

    getRegion(country) {

        this.http.get(this.api.url + '/list/regions/' + country, this.api.setHeaders(true)).subscribe(data => {
            this.regions = data.json().items;
            this.form.form.region.value = '';
        });
    }

    festSelected() {
        this.getRegion(this.form.form.country.value);
    }

    getDisabilities() {
        this.http.get(this.api.url + '/list/health', this.api.setHeaders(true)).subscribe(data => {
            this.disabilities = data.json().items;
        });
    }

    toAdvancedSearch(){
        this.navCtrl.push(AdvancedSearchPage);
    }

    toSearchResultsPage() {

        let params = JSON.stringify({
            action: 'search',
            search: {
                nickName: this.form.form.username.value,
                countryCode: this.form.form.country.value,
                regionCode: this.form.form.region.value,
                disability:this.form.form.disability.value,
                ageFrom: this.ageLower,
                ageTo: this.ageUpper
            }
        });

        this.navCtrl.push(HelloIonicPage, {params: params});
    }

    getAgeValues(event) {
        if (event.value.upper != 0) {
            this.ageUpper = event.value.upper;
        }
        if (event.value.lower != 0) {
            this.ageLower = event.value.lower;
        }
    }
}
