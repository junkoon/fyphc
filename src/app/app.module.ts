import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SpregisterPage } from '../pages/spregister/spregister';
import { LoginHomePage } from '../pages/login-home/login-home'
import { PatientPage } from '../pages/patient/patient'
import { AddpatientPage } from '../pages/addpatient/addpatient'
import { EditpatientPage } from '../pages/editpatient/editpatient'
import { ServicerequestPage } from '../pages/servicerequest/servicerequest'
import { AddservicerequestPage } from '../pages/addservicerequest/addservicerequest'
import { EditservicerequestPage } from '../pages/editservicerequest/editservicerequest'
import { SpviewservicerequestPage } from '../pages/spviewservicerequest/spviewservicerequest'
import { AddquotationPage } from '../pages/addquotation/addquotation'
import { QuotationPage } from '../pages/quotation/quotation'
import { EditquotationPage } from '../pages/editquotation/editquotation'
import { UserviewquotationPage } from '../pages/userviewquotation/userviewquotation'
import { DeclinequotationpagePage } from '../pages/declinequotationpage/declinequotationpage'
import { ResentquotationPage } from '../pages/resentquotation/resentquotation'
import { OngoingservicerequestPage } from '../pages/ongoingservicerequest/ongoingservicerequest'
import { HistoryPage } from '../pages/history/history'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {FirebaseProvider} from './firebase'
import { PatientService } from '../services/patient/patient.service'
import { ServiceRequest } from '../services/servicerequest/servicerequest.service'
import { AccordionComponent } from '../components/accordion/accordion'
// Authentication
import { AuthService } from "./auth.service"
import { firebaseConfig } from "./app.firebase.config"
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth"

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    SpregisterPage,
    LoginHomePage,
    PatientPage,
    AddpatientPage,
    ServicerequestPage,
    AddservicerequestPage,
    EditservicerequestPage,
    EditpatientPage,
    SpviewservicerequestPage,
    AddquotationPage,
    QuotationPage,
    EditquotationPage,
    UserviewquotationPage,
    DeclinequotationpagePage,
    ResentquotationPage,
    OngoingservicerequestPage,
    AccordionComponent,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    SpregisterPage,
    LoginHomePage,
    PatientPage,
    AddpatientPage,
    ServicerequestPage,
    AddservicerequestPage,
    EditservicerequestPage,
    EditpatientPage,
    SpviewservicerequestPage,
    AddquotationPage,
    QuotationPage,
    EditquotationPage,
    UserviewquotationPage,
    DeclinequotationpagePage,
    ResentquotationPage,
    OngoingservicerequestPage,
    HistoryPage
  ],
  providers: [
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    AuthService,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PatientService,
    ServiceRequest,
    Calendar
  ]
})
export class AppModule {}
