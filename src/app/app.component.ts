import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav, ViewController, AlertController, Content, Events} from 'ionic-angular';
import {StatusBar, Push, Splashscreen, AppVersion, Geolocation, Market} from 'ionic-native';
import {Http} from '@angular/http';
import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ChangePasswordPage} from '../pages/change-password/change-password';
import {SearchPage} from '../pages/search/search';
import {LoginPage} from '../pages/login/login';
import {ChangePhotosPage} from '../pages/change-photos/change-photos';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {ProfilePage} from '../pages/profile/profile';
import {SettingsPage} from '../pages/settings/settings';
import {FreezeAccountPage} from '../pages/freeze-account/freeze-account';
import {ArenaPage} from '../pages/arena/arena';
import {InboxPage} from '../pages/inbox/inbox';
import {NotificationsPage} from '../pages/notifications/notifications';
import {RegistrationOnePage} from '../pages/registration-one/registration-one';
import {DialogPage} from '../pages/dialog/dialog';
import {BingoPage} from '../pages/bingo/bingo';
import {PasswordRecoveryPage} from '../pages/password-recovery/password-recovery';
import {PagePage} from '../pages/page/page';
import {ApiQuery} from '../library/api-query';
import {Storage} from '@ionic/storage';
import {FaqPage} from "../pages/faq/faq";
import {SubscriptionPage} from "../pages/subscription/subscription";

declare var $: any;

@Component({
    templateUrl: 'app.html',
    providers: [Geolocation]

})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    @ViewChild(ViewController) viewCtrl: ViewController;
    @ViewChild(Content) content: Content;

    // make HelloIonicPage the root (or first) page
    rootPage: any;
    menu_items_logout: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items_login: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items_settings: Array<{_id: string, icon: string, title: string, count: any, component: any}>;
    menu_items_contacts: Array<{_id: string, list: string, icon: string, title: string, count: any, component: any}>;
    menu_items_footer1: Array<{_id: string, src_img: string, list: string, icon: string, count: any, title: string, component: any}>;
    menu_items_footer2: Array<{_id: string, src_img: string, list: string, icon: string, title: string, count: any, component: any}>;

    //deviceToken: any;
    activeMenu: string;
    username: any;
    back: string;
    options = {sortBtn: {isOpen: true}};
    is_login: any = false;
    status: any = '';
    texts: any = {};
    new_message: any = '';
    message: any = {};
    avatar: string = '';
    stats: string = '';
    interval: any = true;


    constructor(public platform: Platform,
                public menu: MenuController,
                public http: Http,
                public api: ApiQuery,
                public storage: Storage,
                public alertCtrl: AlertController,
                public geolocation: Geolocation,
                public events: Events) {

        this.storage = storage;

        this.initMenuItems(menu);

        this.storage.get('user_id').then((val) => {
            this.initPushNotification();
            if (!val) {
                this.rootPage = LoginPage;
                this.menu_items = this.menu_items_logout;
                //this.loginPage();
            } else {
                this.menu_items = this.menu_items_login;
                this.getBingo();
                this.rootPage = HelloIonicPage;
            }
        });

        this.closeMsg();
        var that = this;
        setInterval(function () {
            let page = that.nav.getActive();
            /*if(page != 'LoginPage' && page != 'RegistrationOnePage' && page != 'RegistrationTwoPage'
             && page != 'RegistrationThreePage' && page != 'ForgotPasswordPage' && page != 'ContactUsPage'){
             alert(that.api.username);*/
            if (!(page.instance instanceof LoginPage) && that.api.username != false && that.api.username != null) {
                that.getBingo();
                // New Message Notification
                that.getMessage();
                that.getStatistics();
            }

        }, 10000);

        this.initializeApp();
        this.menu1Active();

    }

    closeMsg() {
        this.new_message = '';
    }


    /**
     *  Set User's Current Location
     */
    setLocation() {

        this.platform.ready().then(() => {

            Geolocation.getCurrentPosition().then(pos => {
                console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
                var params = JSON.stringify({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
                this.http.post(this.api.url + '/user/location', params, this.api.setHeaders(true)).subscribe(data => {

                },);
            });
        });
    }


    getStatistics() {

        this.storage.get('user_id').then((id) => {
            if (id) {
                let page = this.nav.getActive();
                let headers = this.api.setHeaders(true);
                if (page.instance instanceof ChangePhotosPage) {
                    headers = this.api.setHeaders(true, false, false, '1');
                }
                this.http.get(this.api.url + '/user/profile/' + id, headers).subscribe(data => {

                    //  let statistics = data.json().statistics;

                    // First Sidebar Menu
                    //this.menu_items[2].count = 1;
                    //this.menu_items[0].count = 1;
                    // Contacts Sidebar Menu
                    this.menu_items_contacts[0].count = data.json().statistics.lookedme;
                    this.menu_items_contacts[1].count = data.json().statistics.looked;
                    this.menu_items_contacts[2].count = data.json().statistics.contacted;
                    this.menu_items_contacts[3].count = data.json().statistics.contactedme;
                    this.menu_items_contacts[4].count = data.json().statistics.fav;
                    this.menu_items_contacts[5].count = data.json().statistics.favedme;
                    this.menu_items_contacts[6].count = data.json().statistics.black;
                    //Footer Menu
                    //this.menu_items_footer1[2].count = 1;
                    //this.menu_items_footer1[3].count = 1;
                    this.menu_items_footer2[0].count = data.json().statistics.fav;
                    this.menu_items_footer2[1].count = data.json().statistics.favedme;
                }, err => {
                    console.log("Oops!");
                });
            }
        });

        this.getMessage();

    }

    initMenuItems(menu) {

        this.back = 'Back';

        this.stats = menu.stats;

        this.menu_items_logout = [
            {_id: '', icon: 'log-out', title: 'Login', component: LoginPage, count: ''},
            {_id: 'blocked', icon: '', title: 'Forgot Password', component: PasswordRecoveryPage, count: ''},
            {_id: '', icon: 'mail', title: 'Contact Us', component: ContactUsPage, count: ''},
            {_id: '', icon: 'person-add', title: 'Join Free', component: RegistrationOnePage, count: ''},
        ];

        this.menu_items = [
            {_id: 'inbox', icon: '', title: 'Inbox', component: InboxPage, count: ''},
            {_id: 'the_area', icon: '', title: 'The Arena', component: ArenaPage, count: ''},
            {_id: 'notifications', icon: '', title: 'Notifications', component: NotificationsPage, count: ''},
            {_id: 'stats', icon: 'stats', title: 'Contacts', component: ProfilePage, count: ''},
            {_id: '', icon: 'search', title: 'Search', component: SearchPage, count: ''},
            {_id: '', icon: 'mail', title: 'Contact Us', component: ContactUsPage, count: ''},
            {_id: '', icon: 'information-circle', title: 'FAQ', component: FaqPage, count: ''},
        ];

        this.menu_items_login = [
            {_id: 'inbox', icon: '', title: 'Inbox', component: InboxPage, count: ''},
            {_id: 'the_area', icon: '', title: 'The Arena', component: ArenaPage, count: ''},
            {_id: 'notifications', icon: '', title: 'Notifications', component: NotificationsPage, count: ''},
            {_id: 'stats', icon: 'stats', title: 'Contacts', component: ProfilePage, count: ''},
            {_id: '', icon: 'search', title: 'Search', component: SearchPage, count: ''},
            {_id: '', icon: 'mail', title: 'Contact Us', component: ContactUsPage, count: ''},
            {_id: '', icon: 'information-circle', title: 'FAQ', component: FaqPage, count: ''},
            {_id: 'subscription', icon: 'md-ribbon', title: 'Subscription', component: SubscriptionPage, count: ''}
        ];

        this.menu_items_settings = [
            {_id: 'edit_profile', icon: '', title: 'Edit My Profile', component: EditProfilePage, count: ''},
            {_id: 'edit_photos', icon: '', title: 'Edit Photos', component: ChangePhotosPage, count: ''},
            {_id: '', icon: 'person', title: 'My Profile', component: ProfilePage, count: ''},
            {_id: 'change_password', icon: '', title: 'Change Password', component: ChangePasswordPage, count: ''},
            {_id: 'freeze_account', icon: '', title: 'Freeze Account', component: FreezeAccountPage, count: ''},
            {_id: 'notifications', icon: '', title: 'Notifications', component: NotificationsPage, count: ''},
            {_id: 'settings', icon: 'cog', title: 'Settings', component: SettingsPage, count: ''},
            {_id: '', icon: 'mail', title: 'Contact Us', component: ContactUsPage, count: ''},
            {_id: 'logout', icon: 'log-out', title: 'Logout', component: LoginPage, count: ''}
        ];

        this.menu_items_contacts = [
            {_id: 'viewed', icon: '', title: 'Viewed', component: HelloIonicPage, list: 'looked', count: ''},
            {
                _id: 'viewed_me',
                icon: '',
                title: 'Viewed Me',
                component: HelloIonicPage,
                list: 'lookedMe',
                count: ''
            },
            {
                _id: 'contacted',
                icon: '',
                title: 'Contacted',
                component: HelloIonicPage,
                list: 'contactedThem',
                count: ''
            },
            {
                _id: 'contacted_me',
                icon: '',
                title: 'Contacted Me',
                component: HelloIonicPage,
                list: 'contactedMe',
                count: ''
            },
            {
                _id: 'favorited',
                icon: '',
                title: 'Favorited',
                component: HelloIonicPage,
                list: 'friends',
                count: ''
            },
            {
                _id: 'favorited_me',
                icon: '',
                title: 'Favorited Me',
                component: HelloIonicPage,
                list: 'addedMeToFriends',
                count: ''
            },
            {_id: '', icon: 'lock', title: 'Blocked', component: HelloIonicPage, list: 'blackList', count: ''}
        ];

        this.menu_items_footer1 = [
            {
                _id: 'online',
                src_img: 'img/icons/online.png',
                icon: '',
                list: 'online',
                title: 'Online',
                component: HelloIonicPage,
                count: ''
            },
            {
                _id: 'viewed',
                src_img: 'img/icons/the-arena.png',
                icon: '',
                list: 'looked',
                title: 'The Arena',
                component: ArenaPage,
                count: ''
            },
            {
                _id: 'near-me',
                src_img: '',
                title: 'Near Me',
                list: 'distance',
                icon: 'pin',
                component: HelloIonicPage,
                count: ''
            },
            {
                _id: 'inbox',
                src_img: 'img/icons/inbox.png',
                icon: '',
                list: '',
                title: 'Inbox',
                component: InboxPage,
                count: ''
            },
        ];

        this.menu_items_footer2 = [
            {
                _id: '',
                src_img: 'img/icons/favorited.png',
                icon: '',
                list: 'friends',
                title: 'Favorited',
                component: HelloIonicPage,
                count: ''
            },
            {
                _id: '',
                src_img: 'img/icons/favorited_me.png',
                icon: '',
                list: 'addedMeToFriends',
                title: 'Favorited Me',
                component: HelloIonicPage,
                count: ''
            },

            {
                _id: 'notifications',
                src_img: 'img/icons/notifications_ft.png',
                list: '',
                icon: '',
                title: 'Notifications',
                component: NotificationsPage,
                count: ''
            },
            {_id: '', src_img: '', icon: 'search', title: 'Search', list: '', component: SearchPage, count: ''},
        ];
    }


    menu1Active(bool = true) {
        this.activeMenu = 'menu1';
        this.menu.enable(true, 'menu1');
        this.menu.enable(false, 'menu2');
        this.menu.enable(false, 'menu3');
        if (bool) {
            this.menu.toggle();
        }
    }

    menu2Active() {
        this.activeMenu = 'menu2';
        this.menu.enable(false, 'menu1');
        this.menu.enable(true, 'menu2');
        this.menu.enable(false, 'menu3');
        this.menu.open();
    }

    menu3Active() {
        this.activeMenu = 'menu3';
        this.menu.enable(false, 'menu1');
        this.menu.enable(false, 'menu2');
        this.menu.enable(true, 'menu3');
        this.menu.toggle();
    }

    menuCloseAll() {
        if (this.activeMenu != 'menu1') {
            this.menu.toggle();
            this.activeMenu = 'menu1';
            this.menu.enable(true, 'menu1');
            this.menu.enable(false, 'menu2');
            this.menu.enable(false, 'menu3');
            this.menu.close();
            this.menu.toggle();
        }
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }


    initPushNotification() {
        if (!this.platform.is('cordova')) {
            console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
            return;
        }
        let push = Push.init({
            android: {
                senderID: "95543012588",
                sound: true
            },
            ios: {
                alert: "true",
                badge: false,
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', (data) => {
            //this.deviceToken = data.registrationId;
            this.storage.set('deviceToken', data.registrationId);
            console.log("device token ->", data.registrationId);
            //alert(data.registrationId);
            this.api.sendPhoneId(data.registrationId);
            //alert(data.registrationId);
            //TODO - send device token to server
        });

        push.on('notification', (data) => {
            let self = this;
            //if user using app and push notification comes
            if (data.additionalData.foreground == false) {
                self.nav.push(InboxPage);
            }
        });

        push.on('error', (e) => {
            console.log("PUSH PLUGIN ERROR: " + JSON.stringify(e));
            alert(JSON.stringify(e));
        });
    }

    swipeFooterMenu() {
        if ($('.more-btn').hasClass('menu-left')) {
            $('.more-btn').removeClass('menu-left');

            $('.more-btn').parents('.menu-one').animate({
                'margin-left': '-92%'
            }, 1000);
        } else {
            $('.more-btn').addClass('menu-left');

            $('.more-btn').parents('.menu-one').animate({
                'margin-left': '0'
            }, 1000);
        }
    }

    removeBackground() {
        $('#menu3, #menu2').find('ion-backdrop').remove();
    }

    openPage(page) {
        if (page._id == 'logout') {
            this.status = '';
        } else if (page._id == 'subscription') {
            this.storage.get('user_id').then((user_id) => {
                window.open('http://m.dating4disabled.com/subscription/?app_user_id=' + user_id);
            });
        }

        if (page._id == 'stats') {
            this.menu3Active();
        } else {
            // close the menu when clicking a link from the menu
            this.menu.close();

            let params = '';

            // navigate to the new page if it is not the current page

            if (page.list == 'online') {
                params = JSON.stringify({
                    action: 'online'
                });
            } else if (page.list == 'distance') {
                params = JSON.stringify({
                    action: 'online',
                    list: page.list
                });
            }
            else {

                params = JSON.stringify({
                    action: 'list',
                    list: page.list
                });
            }
            if (page._id != 'subscription') {
                this.nav.push(page.component, {page: page, action: 'list', params: params});
            }
        }
    }


    homePage() {
        this.storage.get('user_id').then((val) => {
            if (val) {
                this.nav.push(HelloIonicPage);
            } else {
                this.nav.push(LoginPage);
            }
        });
    }

    getBingo() {
        this.storage.get('user_id').then((val) => {
            if (val) {
                let page = this.nav.getActive();
                let headers = this.api.setHeaders(true);
                if (page.instance instanceof ChangePhotosPage) {
                    headers = this.api.setHeaders(true, false, false, '1');
                }
                this.http.get(this.api.url + '/user/bingo', headers).subscribe(data => {
                    //this.storage.set('status', this.status);
                    this.avatar = data.json().texts.photo;
                    this.texts = data.json().texts;
                    this.checkStatus();
                    // DO NOT DELETE
                    /*if (this.status != data.json().status) {
                     this.status = data.json().status;
                     this.checkStatus();
                     } else {
                     this.status = data.json().status;
                     }*/
                    console.log(data.json());
                    if (data.json().bingo.itemsNumber > 0) {
                        this.nav.push(BingoPage, {data: data.json()});
                        let params = JSON.stringify(data.json().bingo.items[0]);
                        this.http.post(this.api.url + '/user/bingo/splashed', params, this.api.setHeaders(true)).subscribe(data => {
                            console.log('Splashed',);
                        });
                    }
                });
            }
        });
        //this.nav.push(BingoPage);
    }

    loginPage() {
        this.nav.push(LoginPage);
    }

    dialogPage() {
        let user = {id: this.new_message.userId};
        this.closeMsg();
        this.nav.push(DialogPage, {user: user});
    }

    getMessage() {
        let page = this.nav.getActive();
        let headers = this.api.setHeaders(true);
        if (page.instance instanceof ChangePhotosPage) {
            headers = this.api.setHeaders(true, false, false, '1');
        }
        this.http.get(this.api.url + '/user/newMessagesCount', headers).subscribe(data => {

            if ((this.new_message == '' || typeof this.new_message == 'undefined') && !(page.instance instanceof DialogPage)) {
                this.new_message = data.json().messages;
                if (typeof this.new_message == 'object') {

                    this.http.get(this.api.url + '/messages/notify/' + this.new_message.id, this.api.setHeaders(true)).subscribe(data => {
                        console.log('TEST', data);
                    });
                }
            }

            this.message = data.json();
            //var param;
            //this.events.publish('statistics:updated', param = data.json().newNotificationsNumber);

            //this.api.setStorageData({label: 'notifications', value: data.json().newNotificationsNumber});
            this.menu_items[2].count = data.json().newNotificationsCount;
            this.menu_items[0].count = data.json().newMessagesCount;
            this.menu_items_footer2[2].count = data.json().newNotificationsCount;
            this.menu_items_footer1[3].count = data.json().newMessagesCount;
        });
    }

    checkStatus() {
        let page = this.nav.getActive();
        //noinspection TypeScriptValidateTypes
        //alert(this.nav.getActive() == HelloIonicPage);
        if (!(page.instance instanceof LoginPage) && !(page.instance instanceof PasswordRecoveryPage) && !(page.instance instanceof ContactUsPage) && !(page.instance instanceof ChangePhotosPage) && !(page.instance instanceof RegistrationOnePage) && !(page.instance instanceof PagePage)) {
            let headers = this.api.setHeaders(true);
            if (page.instance instanceof ChangePhotosPage) {
                headers = this.api.setHeaders(true, false, false, '1');
            }
            this.http.get(this.api.url + '/user/login', headers).subscribe(data => {
                    this.storage.set('status', 'login');
                },
                err => {
                    //this.storage.remove('status');
                    this.nav.push(LoginPage, {page: {_id: 'logout'}});
                });
        }
    }

    alert(title, subTitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [{
                text: 'Ok',
                handler: data => {
                    Market.open('com.nysd');
                }
            }]
        });
        alert.present();
    }

    getAppVersion() {

        this.http.get(this.api.url + '/open_api/version', this.api.header).subscribe(data => {
            if (this.platform.is('cordova')) {
                AppVersion.getVersionNumber().then((s) => {
                    if (data.json() != s) {
                        //alert('test');
                    } else {
                        //alert('test2');
                    }
                })
            }

        });
    }

    ngAfterViewInit() {

        this.nav.viewDidEnter.subscribe((view) => {

            //this.alert('title','test');
            //this.getAppVersion();

            this.events.subscribe('statistics:updated', () => {
                // user and time are the same arguments passed in `events.publish(user, time)`
                this.getStatistics();
            });

            let page = this.nav.getActive();

            if (page.instance instanceof HelloIonicPage) {
                this.setLocation();
            }

            let el = this;

            window.addEventListener('native.keyboardshow', function () {
                $('.footerMenu').hide();

                if (page.instance instanceof DialogPage) {
                    $('.scroll-content, .fixed-content').css({'margin-bottom': '58px'});
                    $('.form-dialog').css({'margin-bottom': '-20px'});
                } else {
                    $('.scroll-content, .fixed-content').css({'margin-bottom': '0px'});
                }

            });
            window.addEventListener('native.keyboardhide', function () {
                $('.footerMenu').show();
                if (page.instance instanceof DialogPage) {
                    setTimeout(function () {
                        $('.scroll-content, .fixed-content').css({'margin-bottom': '115px'});
                        el.content.scrollTo(0, 999999, 300);
                    }, 600);
                } else {
                    el.storage.get('user_id').then((user_id) => {
                        if (user_id) {
                            setTimeout(function () {
                                $('.scroll-content, .fixed-content').css({'margin-bottom': '57px'});
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $('.scroll-content, .fixed-content').css({'margin-bottom': '0px'});
                            }, 500);
                        }
                    });
                }
            });

            if (page.instance instanceof LoginPage) {
                this.interval = false;
            }
            if (page.instance instanceof HelloIonicPage && this.interval == false) {
                this.interval = true;
                this.getBingo();
            }

            this.api.setHeaders(true);

            this.storage.get('status').then((val) => {
                if (this.status == '') {
                    this.status = val;
                }
                this.checkStatus();

                if (!val) {
                    this.menu_items = this.menu_items_logout;
                    this.is_login = false;
                } else {
                    this.getStatistics();
                    this.is_login = true;
                    this.menu_items = this.menu_items_login;

                }

                this.api.hideLoad();

            });
            this.username = this.api.username;
        });
    }
}