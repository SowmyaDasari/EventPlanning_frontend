
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {LoginService} from './login-form/login.servie';
import {Routes ,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterFormComponent } from './register-form/register-form.component';
import {RegisterFormService} from './register-form/register-form.service';
import { EventListComponent } from './event-list/event-list.component';
import {ParentRoutingModule} from './parent-routing.module';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventService} from './event-list/event.service';
import { ParticipantComponent } from './participant/participant.component';
import {ParticipantService} from './participant/participant.service';
import {AuthServiceService} from '../app/auth-service.service';
import {MyEventsSercive} from '../app/myevents/myevents.service';
import {AuthGuard} from '../app/auth.guard';
import {DatePipe} from '@angular/common';
import { MyeventsComponent } from './myevents/myevents.component';
import { OrganizerComponent } from './organizer/organizer.component';
import {OrganizerService} from './organizer/organizer.service';
import { EventCreationFormComponent } from './event-creation-form/event-creation-form.component';
import { UndercreationEventDetailsComponent } from './undercreation-event-details/undercreation-event-details.component';
import {UndercreationeventService} from './undercreation-event-details/undercreationevent.service';
import {DashboardService} from './dash-board/dashboard.service';
import { SpeakerSponsor1Component } from './speaker-sponsor1/speaker-sponsor1.component';
import { SpeakereventDescriptionComponent } from './speakerevent-description/speakerevent-description.component';
import { SpeakerSponsor1Service } from './speaker-sponsor1/speaker-sponsor1.service';
import { SpeakereventDescriptionService } from './speakerevent-description/speakerevent-description.service';
import { ReviewsComponent } from './reviews/reviews.component';
import {ReviewsService } from './reviews/reviews.service';
import { SpeakersSponsorsListComponent } from './speakers-sponsors-list/speakers-sponsors-list.component';
import { SpeakerSponsorService } from './speakers-sponsors-list/speaker-sponsor.service';
const appRoutes :Routes=[
  {
    path:'',
    component:LoginFormComponent,
  },
  {
    path: 'dashboard',
    component: DashBoardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'dashboard',
    component: DashBoardComponent
  }
  
];



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashBoardComponent,
    RegisterFormComponent,
    EventListComponent,
    ParticipantComponent,
    MyeventsComponent,
    OrganizerComponent,
    EventCreationFormComponent,
    UndercreationEventDetailsComponent,
    SpeakerSponsor1Component,
    SpeakereventDescriptionComponent,
    ReviewsComponent,
    SpeakersSponsorsListComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ParentRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [LoginService, 
    RegisterFormService,
    EventService,
    ParticipantService,
    AuthServiceService,
    AuthGuard,
    MyEventsSercive,
    OrganizerService,
    DatePipe,
    DashboardService,
    UndercreationeventService,
    SpeakerSponsor1Service,
    SpeakereventDescriptionService,
    ReviewsService,
    SpeakerSponsorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }