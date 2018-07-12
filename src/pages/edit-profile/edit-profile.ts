import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, AlertController, ToastController, Alert, Select, Content} from 'ionic-angular';
import {ApiQuery} from '../../library/api-query';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {ChangePhotosPage} from '../change-photos/change-photos';
import {deepCopy} from 'ionic-angular/util/util';

/*
 Generated class for the EditProfile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var $: any;

@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
    @ViewChild(Content) content: Content;

    private select: Select;
    public test: any = "First";

    @ViewChild('select')
    public set ex(select: any | undefined) {
        this.select = select;
        if (select === undefined) return;
        select.open = this.open;
        if (select._options === undefined) {
            Object.defineProperty(select, '_options', {
                set: (val) => {
                    select['__options'] = val;
                    val.forEach(option => option.ionSelect.subscribe(d => {
                        this.test = d;
                        select.overlay.dismiss();
                    }));
                },
                get: function () {
                    return select['__options']
                }
            })
        }
    }

    form: {
        userNick: { value: any},
        userEmail: {value: any; label: any},
        userGender: {choices: any, value: any},
        sexPrefId: {choices: any, value: any},
        userBirthday: {value: {d: any, m: any, y: any}},
        region: any,
        countryCode: {choices: any ,value: any},
        countryOfOriginCode: {choices: any ,value: any},
        regionCode: {choices: any ,value: any},
        userCityName: {value: any},
        zipCode: {value: any},
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
        userGender: {choices: [[]], value: ''},
        sexPrefId: {choices: [[]], value: ''},
        userBirthday: {value: {d: {}, m: {}, y: {}}},
        region: {},
        countryCode: {choices: [[]], value: ''},
        countryOfOriginCode: {choices: [[]], value: ''},
        regionCode: {choices: [[]], value: ''},
        userCityName: {value: ''},
        zipCode: {value: ''},
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
        userGender: any,
        sexPrefId: any,
        userBirthday: {d: any, m: any, y: any},
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
        loginError: any,
        userNotActivated,
        step: any
    };

    error: {
        userNick: any,
        userEmail: any,
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
    } = {
        userNick: '',
        userEmail: '',
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
    };

    texts: {errText: any} = {errText: ''};

    birth: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery,
                public toastCtrl: ToastController,
                public storage: Storage) {
        this.getPage();

    }


    getPage(step = 1) {

        this.texts.errText = '';

        this.http.post(this.api.url + '/edit', {step: step}, this.api.setHeaders(true)).subscribe(data => {
            this.form = data.json().form;

            if (step == 1) {
                this.birth = new Date(this.form.userBirthday.value.y, this.form.userBirthday.value.m, this.form.userBirthday.value.d).toISOString();
            }
        });
    }

    open() {
        if ((<any>this)._disabled) {
            return;
        }

        // the user may have assigned some options specifically for the alert
        const selectOptions = deepCopy((<any>this).selectOptions);

        // make sure their buttons array is removed from the options
        // and we create a new array for the alert's two buttons
        selectOptions.buttons = [{
            text: (<any>this).cancelText,
            role: 'cancel',
            handler: () => {
                (<any>this).ionCancel.emit(null);
            }
        }];

        // if the selectOptions didn't provide a title then use the label's text
        if (!selectOptions.title && (<any>this)._item) {
            selectOptions.title = (<any>this)._item.getLabelText();
        }


        // default to use the alert interface
        (<any>this).interface = 'alert';

        // user cannot provide inputs from selectOptions
        // alert inputs must be created by ionic from ion-options
        selectOptions.inputs = (<any>this)._options.map(input => {
            return {
                type: ((<any>this)._multi ? 'checkbox' : 'radio'),
                label: input.text,
                value: input.value,
                checked: input.selected,
                disabled: input.disabled,
                handler: (selectedOption: any) => {
                    // Only emit the select event if it is being checked
                    // For multi selects this won't emit when unchecking
                    if (selectedOption.checked) {
                        input.ionSelect.emit(input.value);
                    }
                }
            };
        });

        var selectCssClass = 'select-alert';

        // create the alert instance from our built up selectOptions
        (<any>this).overlay = new Alert((<any>(<any>this))._app, selectOptions);

        if ((<any>this)._multi) {
            // use checkboxes
            selectCssClass += ' multiple-select-alert select-alertless';
        } else {
            // use radio buttons
            selectCssClass += ' single-select-alert select-alertless';
        }

        // If the user passed a cssClass for the select, add it
        selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';
        (<any>this).overlay.setCssClass(selectCssClass);

        (<any>this).overlay.addButton({
            text: (<any>this).okText,
            handler: (selectedValues: any) => {
                (<any>this).onChange(selectedValues);
                (<any>this).ionChange.emit(selectedValues);
            }
        });


        (<any>this).overlay.present(selectOptions);

        (<any>this)._isOpen = true;
        (<any>this).overlay.onDidDismiss(() => {
            (<any>this)._isOpen = false;
        });
    }

    formSubmit() {

        /*this.storage.set('user_data', {
         username: this.form.userNick.value,
         password: this.form.userPass.value
         });

         this.api.setUserData({username: this.form.userNick.value, password: this.form.userPass.value});
         */
        var date_arr = ['', '', ''];


        if (typeof this.birth != 'undefined') {
            date_arr = this.birth.split('-');
        }

        if (this.form.step.value == 1) {

            var data = JSON.stringify({
                userNick: this.form.userNick.value,
                userEmail: this.form.userEmail.value,
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
                step: this.form.step.value
            });
        } else {
            var data = JSON.stringify({
                step: this.form.step.value,
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


        this.http.post(this.api.url + '/edit', data, this.api.header).subscribe(data => this.validate(data.json()));
    }

    scrollToTop() {
        this.content.scrollTo(0, 0, 300);
    }

    validate(response) {

        this.user = response.user;
        this.form = response.form;
        this.texts.errText = response.texts.errText;
        this.error = response.error;

        //If there are no errors - scroll to the top for next step
        if (response.error.length == 0) {
            this.scrollToTop();
            this.api.presentToast(response.texts.successText);
        }

        if (response.error.length == 0 && response.form.step.value == 2 && response.user.userId) {

            this.storage.set('user_photo', response.user.photo);
            this.navCtrl.push(ChangePhotosPage);
        } else if (response.error.length == 0 && response.form.step.value == 1) {
            this.storage.set('username', this.user.userNick);
            this.api.setHeaders(true, this.user.userNick);
            this.getPage(2);
        }
    }

    changePhotosPage() {
        this.navCtrl.push(ChangePhotosPage);
    }
}
