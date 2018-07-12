import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {ApiQuery} from '../../library/api-query';
import {SearchResultsPage} from "../search-results/search-results";

/*
 Generated class for the AdvancedSearch page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-advanced-search',
    templateUrl: 'advanced-search.html'
})
export class AdvancedSearchPage {

    form: any =
    {
        countryCode: {choices: [[]],},
        regionCode: {choices: [[]],},
        age: {label: ''},
        appearanceId: {choices: [[]],},
        bodyTypeId: {choices: [[]],},
        drinkingId: {choices: [[]],},
        educationId: {choices: [[]],},
        ethnicOriginId: {choices: [[]],},
        eyesColorId: {choices: [[]],},
        hairColorId: {choices: [[]],},
        hairLengthId: {choices: [[]],},
        healthId: {choices: [[]],},
        incomeId: {choices: [[]],},
        languageId: {choices: [[]],},
        lookingForIds: {choices: [[]],},
        maritalStatusId: {choices: [[]],},
        mobilityId: {choices: [[]],},
        occupationId: {choices: [[]],},
        religionId: {choices: [[]],},
        sexPrefId: {choices: [[]],},
        smokingId: {choices: [[]],},
        userChildren: {choices: [[]],},
        userCityName: {choices: [[]],},
        userGender: {choices: [[]],},
        withPhotos: {},
        zipCode: {choices: [[]],},
    };

    ageLower: any = 20;
    ageUpper: any = 50;

    default_range: any = {lower: this.ageLower, upper: this.ageUpper}

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public api: ApiQuery) {

        this.http.get(api.url + '/user/advanced/search', api.setHeaders(true)).subscribe(data => {

            this.form = data.json().form;

            console.log(this.form);


        }, err => {
            console.log("Oops!");
        });

    }

    toSearchResultsPage() {
        let params = JSON.stringify({
                countryCode: this.form.countryCode.value,
                regionCode: this.form.regionCode.value,
                ageFrom: this.ageLower,
                ageTo: this.ageUpper,
                appearanceId: this.form.appearanceId.value,
                bodyTypeId: this.form.bodyTypeId.value,
                drinkingId: this.form.drinkingId.value,
                educationId: this.form.educationId.value,
                ethnicOriginId: this.form.ethnicOriginId.value,
                eyesColorId: this.form.eyesColorId.value,
                hairColorId: this.form.hairColorId.value,
                hairLengthId: this.form.hairLengthId.value,
                count: 10,
                healthId: this.form.healthId.value,
                incomeId: this.form.incomeId.value,
                languageId: this.form.languageId.value,
                lookingForIds: this.form.lookingForIds.value,
                maritalStatusId: this.form.maritalStatusId.value,
                mobilityId: this.form.mobilityId.value,
                occupationId: this.form.occupationId.value,
                religionId: this.form.religionId.value,
                sexPrefId: this.form.sexPrefId.value,
                smokingId: this.form.smokingId.value,
                userChildren: this.form.userChildren.value,
                userCityName: this.form.userCityName.value,
                userGender: this.form.userGender.value,
                withPhotos: this.form.withPhotos.value,
                zipCode: this.form.countryCode.value =='US'? this.form.zipCode.value: '',

        });
        this.navCtrl.push(SearchResultsPage, {params: params});
    }

    photoValue() {
        this.form.withPhotos.value = this.form.withPhotos.value? false: true;
    }

    back() {
        this.navCtrl.pop();
    }

    selectedRegion() {
        this.http.get(this.api.url + '/api/v1/search?advanced=1&advanced_search[region]=' + this.form.region.value, this.api.setHeaders(true)).subscribe(data => {
            this.form.area = data.json().area;
            console.log(data.json());
        }, err => {
            console.log("Oops!");
        });
    }

    getRegions() {
        if (this.form.countryCode.value) {
            this.http.get(this.api.url + '/user/advanced/search/regions/' + this.form.countryCode.value, this.api.setHeaders(true)).subscribe(data => {
                this.form.regionCode = data.json().form.regionCode;
                if(data.json().form.zipCode) {
                    this.form.zipCode = data.json().form.zipCode;
                }else {
                    this.form.zipCode = {};
                }
            });
        }else{
            this.form.regionCode.value = [];
            this.form.regionCode.choices = [];
        }
    }

    getAgeValues(event) {
        if (event.value.upper != 0) {
            this.ageUpper = event.value.upper;
        }
        if (event.value.lower != 0) {
            this.ageLower = event.value.lower;
        }
        console.log(event);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdvancedSearchPage');
    }

}
