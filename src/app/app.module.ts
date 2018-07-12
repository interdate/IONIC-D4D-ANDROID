import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {LoginPage} from '../pages/login/login';
import {ChangePasswordPage} from '../pages/change-password/change-password';
import {SearchPage} from '../pages/search/search';
import {ChangePhotosPage} from '../pages/change-photos/change-photos';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {ProfilePage} from '../pages/profile/profile';
import {FullScreenProfilePage} from '../pages/full-screen-profile/full-screen-profile';
import {SettingsPage} from '../pages/settings/settings';
import {FreezeAccountPage} from '../pages/freeze-account/freeze-account';
import {ArenaPage} from '../pages/arena/arena';
import {InboxPage} from '../pages/inbox/inbox';
import {NotificationsPage} from '../pages/notifications/notifications';
import {DialogPage} from '../pages/dialog/dialog';
import {MainMenuPage} from '../pages/main-menu/main-menu';
import {ApiQuery} from '../library/api-query';
import {PasswordRecoveryPage} from '../pages/password-recovery/password-recovery';
import {RegistrationOnePage} from '../pages/registration-one/registration-one';
import {BingoPage} from '../pages/bingo/bingo';
import {PagePage} from '../pages/page/page';
import {FaqPage} from "../pages/faq/faq";
import {Storage} from '@ionic/storage';
import {SelectAlertless} from '../pages/select/selectalertless';
import {AdvancedSearchPage} from "../pages/advanced-search/advanced-search";
import {SearchResultsPage} from "../pages/search-results/search-results";
import {SubscriptionPage} from "../pages/subscription/subscription";

@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        SubscriptionPage,
        ItemDetailsPage,
        LoginPage,
        ChangePasswordPage,
        SearchPage,
        ChangePhotosPage,
        ContactUsPage,
        ProfilePage,
        SearchResultsPage,
        FullScreenProfilePage,
        SettingsPage,
        FreezeAccountPage,
        ArenaPage,
        InboxPage,
        NotificationsPage,
        DialogPage,
        MainMenuPage,
        EditProfilePage,
        PasswordRecoveryPage,
        RegistrationOnePage,
        BingoPage,
        PagePage,
        FaqPage,
        ApiQuery,
        AdvancedSearchPage,
        SelectAlertless
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            menuType: 'overlay',
            scrollAssist: false,
            autoFocusAssist: false
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AdvancedSearchPage,
        HelloIonicPage,
        ItemDetailsPage,
        LoginPage,
        ChangePasswordPage,
        SubscriptionPage,
        SearchPage,
        ChangePhotosPage,
        ContactUsPage,
        ProfilePage,
        FullScreenProfilePage,
        SearchResultsPage,
        SettingsPage,
        FreezeAccountPage,
        ArenaPage,
        InboxPage,
        NotificationsPage,
        DialogPage,
        MainMenuPage,
        EditProfilePage,
        PasswordRecoveryPage,
        RegistrationOnePage,
        BingoPage,
        PagePage,
        FaqPage,
        SelectAlertless
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiQuery, ArenaPage, Storage]
})

export class AppModule {
}
