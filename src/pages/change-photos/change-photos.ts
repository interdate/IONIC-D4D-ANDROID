import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, AlertController, LoadingController} from 'ionic-angular';
import {ImagePicker, Camera, Transfer} from 'ionic-native';
import {ApiQuery} from '../../library/api-query';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Storage} from '@ionic/storage';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {PagePage} from '../page/page';
/*
 Generated class for the ChangePhotos page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-change-photos',
    templateUrl: 'change-photos.html',
    providers: [Storage]

})
export class ChangePhotosPage {

    image: any;
    photos: any;
    imagePath: any;
    username: any = false;
    password: any = false;
    new_user: any = false;

    dataPage: { noPhoto: any, photos: Array<{ _id: string, face: string, isValid: string, main: string, url: any}> } =
    {noPhoto: '', photos: []};

    texts: {reg_success: any};
    description: { text1: any, text2: any, text3: any, text4: any };

    constructor(public actionSheetCtrl: ActionSheetController,
                public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage,
                public loadingCtrl: LoadingController) {

        if (navParams.get('new_user')) {
            this.new_user = navParams.get('new_user');
        } else {

            /*
             this.storage.get('user_id').then((val) => {
             this.storage.get('username').then((username) => {
             this.username = username;
             });
             this.storage.get('password').then((password) => {
             this.password = password;
             });
             });
             if (navParams.get('username') && navParams.get('password')) {
             this.password = navParams.get('password');
             this.username = navParams.get('username');
             }*/
        }


        this.getPageData();

        this.image = navParams.get('images');

    }

    delete(photo) {
        let confirm = this.alertCtrl.create({
            title: 'Delete this photo?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.postPageData('deleteImage', photo);
                    }
                }
            ]
        });
        confirm.present();
    }


    getCount(num) {
        return parseInt(num) + 1;
    }

    getPageData() {
        this.http.get(this.api.url + '/user/images', this.api.setHeaders(true, false, false, this.new_user)).subscribe(data => {
            this.dataPage.photos = data.json().images.items;
            this.texts = data.json().texts;
            this.description = data.json().texts.description;
            this.dataPage.noPhoto = data.json().images.noPhoto;
            this.photos = Object.keys(this.dataPage.photos);
            this.api.setHeaders(true);
        });
    }

    getPage(id) {
        this.navCtrl.push(PagePage, {id: id});
    }


    postPageData(type, params) {

        if (type == 'mainImage') {
            var data = JSON.stringify({setMain: params.id});
            var url = '/user/images/setMain/' + params.id;

        } else if ('deletePage') {
            var url = '/user/images/delete/' + params.id;
            var data = JSON.stringify({
                delete: params.id
            });
        }

        this.http.post(this.api.url + url, {}, this.api.setHeaders(true)).subscribe(data => {

            this.dataPage.photos = data.json().images.items;
            this.photos = Object.keys(this.dataPage.photos);
        });
    }


    edit(photo) {

        let mainOpt = [];

        if (photo.main != "1" && photo.isValid == "1") {

            mainOpt.push({
                    text: 'Set as main photo',
                    icon: 'contact',
                    handler: () => {
                        this.postPageData('mainImage', photo);
                    }
                }
            );
        }
        mainOpt.push({
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
                this.delete(photo);
            }
        });
        mainOpt.push({
            text: 'Cancel',
            role: 'destructive',
            icon: 'close',
            handler: () => {
                console.log('Cancel clicked');
            }
        });


        var status = photo.isValid == "0" ?
            'Waiting for approval' : 'Approved';

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Edit Photo',

            subTitle: 'Status' + ': ' + status,

            buttons: mainOpt
        });
        actionSheet.present();
    }

    add() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'Add Photo',
            buttons: [
                {
                    text: 'Choose from camera',
                    icon: 'aperture',
                    handler: () => {
                        this.openCamera();
                    }
                }, {
                    text: 'Choose from gallery',
                    icon: 'photos',
                    handler: () => {
                        this.openGallery();
                    }
                }, {
                    text: 'Cancel',
                    role: 'destructive',
                    icon: 'close',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }


    openGallery() {

        let options = {
            maximumImagesCount: 1,
            width: 600,
            height: 600,
            quality: 100
        };

        ImagePicker.getPictures(options).then(
            (file_uris) => {
                this.uploadPhoto(file_uris[0]);
            },
        );
    }

    openCamera() {
        let cameraOptions = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 600,
            saveToPhotoAlbum: true,
            chunkedMode: true,
            correctOrientation: true
        };

        Camera.getPicture(cameraOptions).then((imageData) => {
            this.uploadPhoto(imageData);
        });
    }

    uploadPhoto(url) {

        this.api.showLoad();

        this.storage.get('user_id').then((val) => {

            let options = {
                fileKey: "file",
                fileName: 'test.jpg',
                chunkedMode: false,
                mimeType: "image/jpg",
                headers: {
                    Authorization: "Basic " + btoa(this.api.username + ":" + this.api.password),
                    appVersion: this.api.version
                }

            };

            const fileTransfer = new Transfer();

            fileTransfer.upload(url, this.api.url + '/user/image', options).then((entry) => {

                if (this.new_user) {
                    this.navCtrl.push(ChangePhotosPage, {new_user: true});

                } else {
                    this.navCtrl.push(ChangePhotosPage, {});

                }

                this.api.hideLoad();
            }, (err) => {
                this.api.hideLoad();
            });
        });

    }


    onHomePage() {

        let alert = this.alertCtrl.create({
            message: this.texts.reg_success,
            buttons: ['ok']
        });
        alert.present();

        this.navCtrl.push(HelloIonicPage);
    }

}
