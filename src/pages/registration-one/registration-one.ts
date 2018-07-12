import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, AlertController, Content} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {PagePage} from '../page/page'
import {LoginPage} from "../login/login";
import {ChangePhotosPage} from "../change-photos/change-photos";


/*
 Generated class for the RegistrationOne page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $: any;

@Component({
    selector: 'page-registration',
    templateUrl: 'registration-one.html',
    providers: [Storage]
})

export class RegistrationOnePage {
    @ViewChild(Content) content: Content;

    form: {
        userNick: { value: any},
        userEmail: {value: any; label: any},
        userPass: { value: any},
        userPass2: { value: any},
        userGender: {choices: any, value: any},
        sexPrefId: {choices: any, value: any},
        userBirthday: {value: {d: any, m: any, y: any}},
        region: any,
        countryCode: {choices: any ,value: any},
        countryOfOriginCode: {choices: any ,value: any},
        regionCode: {choices: any ,value: any},
        userCityName: {value: any},
        zipCode: {value: any},
        agree: {value: any},
        userfName: any,
        userlName: any,
        maritalStatusId: {choices: any, value: any }
        userChildren: {choices: any,value: any }
        ethnicOriginId: {choices: any, value: any }
        religionId: {choices: any, value: any }
        educationId: {choices: any, value: any }
        occupationId: {choices: any, value: any }
        incomeId: {choices: any, value: any }
        languageId: {choices: any, value: any }
        appearanceId: {choices: any, value: any }
        bodyTypeId: {choices: any, value: any }
        userHight: {choices: any, value: any }
        userWeight: {choices: any, value: any }
        hairLengthId: {choices: any, value: any }
        hairColorId: {choices: any,value: any }
        eyesColorId: {choices: any, value: any }
        smokingId: {choices: any, value: any }
        drinkingId: {choices: any, value: any }
        hobbyIds: {choices: any, value: any }
        userAboutMe: any,
        userLookingFor: any,
        userHobbies: {choices: any, value: any}
        characteristicIds: {choices: any, value: any}
        lookingForIds: {choices: any, value: any}
        healthId: {choices: any, value: any}
        mobilityId: {choices: any, value: any}
        step: {value: any}
    } =
    {
        userNick: {value: ''},
        userEmail: {value: '', label: ''},
        userPass: {value: ''},
        userPass2: {value: ''},
        userGender: {choices: [[]], value: ''},
        sexPrefId: {choices: [[]], value: ''},
        userBirthday: {value: {d: {}, m: {}, y: {}}},
        region: {},
        countryCode: {choices: [[]], value: ''},
        countryOfOriginCode: {choices: [[]], value: ''},
        regionCode: {choices: [[]], value: ''},
        userCityName: {value: ''},
        zipCode: {value: ''},
        agree: {value: 0},
        userfName: '',
        userlName: '',
        maritalStatusId: {choices: [[]], value: ''},
        userChildren: {choices: [[]], value: ''},
        ethnicOriginId: {choices: [[]], value: ''},
        religionId: {choices: [[]], value: ''},
        educationId: {choices: [[]], value: ''},
        occupationId: {choices: [[]], value: ''},
        incomeId: {choices: [[]], value: ''},
        languageId: {choices: [[]], value: ''},
        appearanceId: {choices: [[]], value: ''},
        bodyTypeId: {choices: [[]], value: ''},
        userHight: {choices: [[]], value: ''},
        userWeight: {choices: [[]], value: ''},
        hairLengthId: {choices: [[]], value: ''},
        hairColorId: {choices: [[]], value: ''},
        eyesColorId: {choices: [[]], value: ''},
        smokingId: {choices: [[]], value: ''},
        drinkingId: {choices: [[]], value: ''},
        hobbyIds: {choices: [[]], value: ''},
        userAboutMe: '',
        userLookingFor: '',
        userHobbies: {choices: [[]], value: ''},
        characteristicIds: {choices: [[]], value: ''},
        lookingForIds: {choices: [[]], value: ''},
        healthId: {choices: [[]], value: ''},
        mobilityId: {choices: [[]], value: ''},
        step: {value: ''},
    };

    user: {
        userNick: any,
        userEmail: any,
        userPass: any,
        userPass2: any,
        userGender: any,
        sexPrefId: any,
        userBirthday: {d: any, m: any, y: any},
        region: any,
        countryCode: any,
        countryOfOriginCode: any,
        regionCode: any,
        userCityName: any,
        zipCode: any,
        agree: any,
        userfName: any,
        userlName: '',
        maritalStatusId: any,
        userChildren: any,
        ethnicOriginId: any,
        religionId: any,
        educationId: any,
        occupationId: any,
        incomeId: any,
        languageId: any,
        appearanceId: any,
        bodyTypeId: any,
        userHight: any,
        userWeight: any,
        hairLengthId: any,
        hairColorId: any,
        eyesColorId: any,
        smokingId: any,
        drinkingId: any,
        hobbyIds: any,
        userAboutMe: any,
        userLookingFor: any,
        userHobbies: any,
        characteristicIds: any,
        lookingForIds: any,
        healthId: any,
        mobilityId: any,
        loginError: any,
        userNotActivated,
        step: any
    };

    error: {
        userNick: any,
        userEmail: any,
        userPass: any,
        userPass2: any,
        userGender: any,
        sexPrefId: any,
        userBirthday: any,
        region: any,
        countryCode: any,
        countryOfOriginCode: any,
        regionCode: any,
        userCityName: any,
        zipCode: any,
        userfName: any,
        userlName: '',
        maritalStatusId: any,
        userChildren: any,
        ethnicOriginId: any,
        religionId: any,
        educationId: any,
        occupationId: any,
        incomeId: any,
        languageId: any,
        appearanceId: any,
        bodyTypeId: any,
        userHight: any,
        userWeight: any,
        hairLengthId: any,
        hairColorId: any,
        eyesColorId: any,
        smokingId: any,
        drinkingId: any,
        hobbyIds: any,
        userAboutMe: any,
        userLookingFor: any,
        userHobbies: any,
        characteristicIds: any,
        lookingForIds: any,
        healthId: any,
        mobilityId: any,
        agree: any
    } = {
        userNick: '',
        userEmail: '',
        userPass: '',
        userPass2: '',
        userGender: '',
        sexPrefId: '',
        userBirthday: '',
        region: '',
        countryCode: '',
        countryOfOriginCode: '',
        regionCode: '',
        userCityName: '',
        zipCode: '',
        userfName: '',
        userlName: '',
        maritalStatusId: '',
        userChildren: '',
        ethnicOriginId: '',
        religionId: '',
        educationId: '',
        occupationId: '',
        incomeId: '',
        languageId: '',
        appearanceId: '',
        bodyTypeId: '',
        userHight: '',
        userWeight: '',
        hairLengthId: '',
        hairColorId: '',
        eyesColorId: '',
        smokingId: '',
        drinkingId: '',
        hobbyIds: '',
        userAboutMe: '',
        userLookingFor: '',
        userHobbies: '',
        characteristicIds: '',
        lookingForIds: '',
        healthId: '',
        mobilityId: '',
        agree: ''
    }

    texts: {errText: any} = {errText: ''};

    birth: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage) {

        this.storage = storage;

        this.getPage();
    }

    getPage() {
        this.http.post(this.api.url + '/register', this.api.setHeaders(false)).subscribe(data => {
            this.form = data.json().form;
        });
    }

    festSelected() {

        let params = JSON.stringify({step: 1, getRegions: 1, countryCode: this.form.countryCode.value});

        this.http.post(this.api.url + '/register', params, this.api.setHeaders(false)).subscribe(data => {

            if (this.form.countryCode.value.toString() == "US") {
                this.form.regionCode = data.json().form.regionCode;
                this.form.zipCode = data.json().form.zipCode;
            } else {
                delete this.form.zipCode;
                this.form.regionCode = data.json().form.regionCode;
            }
        });
    }

    back() {

        var data = JSON.stringify({
            userNick: this.user.userNick,
            userEmail: this.user.userEmail,
            userPass: this.user.userPass,
            userPass2: this.user.userPass2,
            userGender: this.user.userGender,
            sexPrefId: this.user.sexPrefId,
            countryCode: this.user.countryCode,
            userCityName: this.user.userCityName,
            countryOfOriginCode: this.user.countryOfOriginCode,
            userBirthday: {
                d: this.user.userBirthday.d,
                m: this.user.userBirthday.m,
                y: this.user.userBirthday.y
            },
            regionCode: this.user.regionCode,
            zipCode: this.user.zipCode ? this.user.zipCode : '',
            agree: this.user.agree,
            step: this.user.step,

            userfName: this.form.userfName.value,
            userlName: this.form.userlName.value,
            maritalStatusId: this.form.maritalStatusId.value,
            userChildren: this.form.userChildren.value,
            ethnicOriginId: this.form.ethnicOriginId.value,
            religionId: this.form.religionId.value,
            educationId: this.form.educationId.value,
            occupationId: this.form.occupationId.value,
            incomeId: this.form.incomeId.value,
            languageId: this.form.languageId.value,
            appearanceId: this.form.appearanceId ? this.form.appearanceId.value : '',
            bodyTypeId: this.form.bodyTypeId ? this.form.bodyTypeId.value : '',
            userHight: this.form.userHight ? this.form.userHight.value : '',
            userWeight: this.form.userWeight ? this.form.userWeight.value : '',
            hairLengthId: this.form.hairLengthId ? this.form.hairLengthId.value : '',
            hairColorId: this.form.hairColorId ? this.form.hairColorId.value : '',
            eyesColorId: this.form.eyesColorId ? this.form.eyesColorId.value : '',
            smokingId: this.form.smokingId ? this.form.smokingId.value : '',
            drinkingId: this.form.drinkingId ? this.form.drinkingId.value : '',
            hobbyIds: this.form.hobbyIds ? this.form.hobbyIds.value : '',
            userAboutMe: this.form.userAboutMe ? this.form.userAboutMe.value : '',
            userLookingFor: this.form.userLookingFor ? this.form.userLookingFor.value : '',
            userHobbies: this.form.userHobbies ? this.form.userHobbies.value : '',
            characteristicIds: this.form.characteristicIds ? this.form.characteristicIds.value : '',
            lookingForIds: this.form.lookingForIds ? this.form.lookingForIds.value : '',
            healthId: this.form.healthId ? this.form.healthId.value : '',
            mobilityId: this.form.mobilityId ? this.form.mobilityId.value : '',
            stepBack: 1
        });

        this.http.post(this.api.url + '/register', data, this.api.header).subscribe(data => this.validate(data.json()));
    }

    getTermsAndConditions() {
        this.navCtrl.push(PagePage, {id: 1});
    }

    formSubmit() {

        this.api.showLoad();

        this.texts.errText = '';

        var date_arr = ['', '', ''];

        if (typeof this.birth != 'undefined') {
            date_arr = this.birth.split('-');
        }

        if (this.form.step.value == 1) {
            var data = JSON.stringify({
                userNick: this.form.userNick.value,
                userEmail: this.form.userEmail.value,
                userPass: this.form.userPass.value,
                userPass2: this.form.userPass2.value,
                userGender: this.form.userGender.value,
                sexPrefId: this.form.sexPrefId.value,
                countryCode: this.form.countryCode.value,
                userCityName: this.form.userCityName.value,
                countryOfOriginCode: this.form.countryOfOriginCode.value,
                userBirthday: {
                    d: parseInt(date_arr[2]),
                    m: parseInt(date_arr[1]),
                    y: parseInt(date_arr[0])
                },
                regionCode: this.form.regionCode.value,
                zipCode: this.form.zipCode ? this.form.zipCode.value : '',
                agree: this.form.agree.value,
                step: this.form.step.value
            });
        } else {
            var data = JSON.stringify({
                userNick: this.user.userNick,
                userEmail: this.user.userEmail,
                userPass: this.user.userPass,
                userPass2: this.user.userPass2,
                userGender: this.user.userGender,
                sexPrefId: this.user.sexPrefId,
                countryCode: this.user.countryCode,
                userCityName: this.user.userCityName,
                countryOfOriginCode: this.user.countryOfOriginCode,
                userBirthday: {
                    d: this.user.userBirthday.d,
                    m: this.user.userBirthday.m,
                    y: this.user.userBirthday.y
                },
                regionCode: this.user.regionCode,
                zipCode: this.user.zipCode ? this.user.zipCode : '',
                agree: this.user.agree,
                step: this.user.step,

                userfName: this.form.userfName.value,
                userlName: this.form.userlName.value,
                maritalStatusId: this.form.maritalStatusId.value,
                userChildren: this.form.userChildren.value,
                ethnicOriginId: this.form.ethnicOriginId.value,
                religionId: this.form.religionId.value,
                educationId: this.form.educationId.value,
                occupationId: this.form.occupationId.value,
                incomeId: this.form.incomeId.value,
                languageId: this.form.languageId.value,
                appearanceId: this.form.appearanceId ? this.form.appearanceId.value : '',
                bodyTypeId: this.form.bodyTypeId ? this.form.bodyTypeId.value : '',
                userHight: this.form.userHight ? this.form.userHight.value : '',
                userWeight: this.form.userWeight ? this.form.userWeight.value : '',
                hairLengthId: this.form.hairLengthId ? this.form.hairLengthId.value : '',
                hairColorId: this.form.hairColorId ? this.form.hairColorId.value : '',
                eyesColorId: this.form.eyesColorId ? this.form.eyesColorId.value : '',
                smokingId: this.form.smokingId ? this.form.smokingId.value : '',
                drinkingId: this.form.drinkingId ? this.form.drinkingId.value : '',
                hobbyIds: this.form.hobbyIds ? this.form.hobbyIds.value : '',
                userAboutMe: this.form.userAboutMe ? this.form.userAboutMe.value : '',
                userLookingFor: this.form.userLookingFor ? this.form.userLookingFor.value : '',
                userHobbies: this.form.userHobbies ? this.form.userHobbies.value : '',
                characteristicIds: this.form.characteristicIds ? this.form.characteristicIds.value : '',
                lookingForIds: this.form.lookingForIds ? this.form.lookingForIds.value : '',
                healthId: this.form.healthId ? this.form.healthId.value : '',
                mobilityId: this.form.mobilityId ? this.form.mobilityId.value : '',
            });
        }


        this.http.post(this.api.url + '/register', data, this.api.header).subscribe(data => this.validate(data.json()));
    }

    scrollToTop() {
        this.content.scrollTo(0, 0, 300);
    }

    validate(response) {

        this.api.hideLoad();

        this.user = response.user;
        this.form = response.form;
        this.texts.errText = response.texts.errText;
        this.error = response.error;

        //If there are no errors - scroll to the top for next step
        if (response.error.length == 0) {
            this.scrollToTop();
            this.texts.errText = '';
        }

        if (response.error.length == 0 && response.form.step.value == 2 && response.user.userId) {

            this.storage.set('username', this.user.userNick);
            this.storage.set('password', this.user.userPass);
            this.storage.set('user_id', response.user.userId);
            this.storage.set('user_photo', response.user.photo);

            this.api.setHeaders(true, this.user.userNick, this.user.userPass, "1");

            this.navCtrl.push(ChangePhotosPage, {new_user: true});
        }

    }

}
