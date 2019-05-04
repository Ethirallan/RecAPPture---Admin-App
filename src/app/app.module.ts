import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RejectedComponent } from './components/rejected/rejected.component';
import { OrdersService } from './services/orders.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { AngularOpenlayersModule } from "ngx-openlayers";
import { FormsModule } from '@angular/forms';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { DoneComponent } from './components/done/done.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OrdersComponent,
    OrderDetailsComponent,
    NotFoundComponent,
    RejectedComponent,
    LoginComponent,
    LoadingAnimationComponent,
    WaitingComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularOpenlayersModule,
    FormsModule,
    TextareaAutosizeModule
  ],
  providers: [
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
