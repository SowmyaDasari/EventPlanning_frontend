import { Component, OnInit } from '@angular/core';
import {MyEventsSercive} from './myevents.service';
import { ActivatedRoute, Params } from '@angular/router'; 
import 'rxjs/add/operator/switchMap'; 
import {Event} from '../event';
import {DashboardService} from '../dash-board/dashboard.service';
import { EventConverter } from '../eventconverter';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {

  eventList1:EventConverter[]=[] ;
  //eventList2:EventConverter[]=[] ;
  //eventList3:EventConverter[]=[] ;
  //eventList4:EventConverter[]=[] ;
  closedEvents:EventConverter[]=[];
  eventnames=[];
  index:number;
  waitingevent:EventConverter[]=[];
  appliedevent:EventConverter[]=[];
  createdevents:EventConverter[]=[];
  requestednames=[];
  requestednamessponser=[];
  invitationasorg=[];

  constructor(private router: Router,private myEvents:MyEventsSercive,private route: ActivatedRoute, private dashboardservice:DashboardService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
      }
   }

  ngOnInit() {
    this.route.params.subscribe(params => {this.index =+params['index']})
    this.setVariable(this.index)
    
      this.invitation();      
      }

      setVariable(index:number)
      {
        this.index=index;
        if(index==1){
          this.waitinglist();
          this.displayevents("participant");
        }
        else if(index==2){
          this.CreatedEvents();
          this.displayevents("organizer");
          this.requestFromSpeakers();
          this.requestFromSponsor();
          this.invitationforOrganiser();
        }
        else if(index==3){
          this.displayevents("speaker");
          this.AppliedForEvent();
          this.invitationforSpeaker();
          this.invitationforSponser();

        }
        else if(index==4){
          this.AppliedForEvent();
          this.displayevents("sponsor");
        }
      }

      invitation()
      {
        this.dashboardservice.displayNotification()
        .subscribe((names) =>{
            this.eventnames=names;
  
        })
      }

      displayevents(role:string){
        this.myEvents.ListOfMyEvents(role)
        .subscribe((eventList) =>{
          if(this.index==1){
          this.eventList1=eventList;
          }
          else if(this.index==2){
            this.eventList1=eventList;
            }
          else if(this.index==3){
              this.eventList1=eventList;
          }
          else if(this.index==4){
                this.eventList1=eventList;
          }
        })
        this.myEvents.ClosedEvents(role).
        subscribe((closedEvents)=>{
          this.closedEvents=closedEvents;
        })
      }

      waitinglist()
      {
        this.myEvents. getListByStatus('waiting')
        .subscribe((eventnames) =>{
          this.waitingevent=eventnames;
        });
        return;
      }

      AppliedForEvent()
      {
        this.myEvents.getListByStatus('applied')
        .subscribe((eventnames) =>{
          this.appliedevent=eventnames;
        });
        return;
      }

      CreatedEvents()
      {
        this.myEvents.getListByStatus('created')
        .subscribe((eventnames) =>{
          this.createdevents=eventnames;
        });
        return;

      }

        requestAccepted()
      {
        this.myEvents.StatusChange("approved")
        .subscribe((response)=>{
          this.router.navigateByUrl("/dashboard/myevent/"+this.index);
        });
        return;
      }
      requestRejected()
      {
        this.myEvents.StatusChange("rejected")
        .subscribe((response)=>{
          this.router.navigateByUrl("/dashboard/myevent/"+this.index);
        });
      }

      requestFromSpeakers()
      {
        this.myEvents.requestFromSpeakers()
        .subscribe((response)=>{
         this.requestednames=response;
         this.router.navigateByUrl("/dashboard/myevent/"+this.index);
         

        })
      }
      
      requestFromSponsor()
      {

        this.myEvents.requestFromSponsor()
        .subscribe((response)=>{
         this.requestednamessponser=response;
         console.log(this.requestednamessponser);

        })

      }

      requestAcceptedFromOrgainzer(id:number)
      {
        
        this.myEvents.StatusChangeForSpeakerSponser("approved",id)
        .subscribe((response)=>{
          console.log(response)
          this.router.navigateByUrl("/dashboard/myevent/"+this.index);
        });
      }

      requestRejectedFromOrgainzer(id:number)
      {
        this.myEvents.StatusChangeForSpeakerSponser("rejected",id)
        .subscribe((response)=>{
          console.log(response)
          this.router.navigateByUrl("/dashboard/myevent/"+this.index);
        });
      }

      invitationforSponser()
      {
        this.dashboardservice.displayNotification()
        .subscribe((names) =>{
            this.eventnames=names;
  
        })
      }
      
      invitationforSpeaker()
      {
        this.dashboardservice.displayNotification()
        .subscribe((names) =>{
            this.eventnames=names;
  
        })
      }
      
      invitationforOrganiser()
      {
        this.myEvents.RequestFromOrganizer()
        .subscribe((names) =>{
            this.invitationasorg=names;
          })
      }

      
      

}