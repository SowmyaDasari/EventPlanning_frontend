import { ToastrService } from 'ngx-toastr';

import { OrganizerService } from './../organizer/organizer.service';
import { Event } from './../event';
import { UndercreationeventService } from './undercreationevent.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params ,Router} from '@angular/router';
import { Register } from '../register';
import { EventCreation } from '../event-creation-form/eventcreation';

@Component({
  selector: 'app-undercreation-event-details',
  templateUrl: './undercreation-event-details.component.html',
  styleUrls: ['./undercreation-event-details.component.css']
})
export class UndercreationEventDetailsComponent implements OnInit {
    undercreationeventDetail:EventCreation;
    organizerid:number;
    organizer:Register;
    typeoforganizer:boolean;
    event_id:number;
    sendstatus:boolean;
    loggedinuser:any;
    roleDetails:[{role:String,name:String}];
   
  constructor(private undercreation:UndercreationeventService,private organizerservice:OrganizerService,private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    this.loggedinuser=+sessionStorage.getItem("userid");
    
    this.route.params
.switchMap((params: Params) => this.undercreation.showDetails(params['eventname']))
. subscribe((response)=>{this.undercreationeventDetail=response
  this.event_id=response.eventid
 
this.typeoforganizer=this.undercreationeventDetail.eventtype==="single",
 this.organizerid=this.undercreationeventDetail.organizer_id
 this.sendstatus=this.organizerid!=this.loggedinuser
 this.organizerservice.organizerDetails(this.organizerid).subscribe((responses:Register)=>{this.organizer=responses})
 this.undercreation.organizerEvent(this.organizerid,this.event_id).subscribe((response)=>this.roleDetails=response)

} );




  }
  
  

  toOrganizer()
  {
    
    this.organizerservice.sendToOrganizer(+sessionStorage.getItem("userid"),this.event_id).subscribe(
      (response)=>{if(response=="success")
      this.toastr.success('Success', "request send successfully");
      else
      this.toastr.error('Failed', response);
        
      }
    )

  }

  update(id:number)
  {
    this.undercreation.updatephase(id).subscribe(
      (response)=>{

        this.toastr.info('Message', response);
        this.router.navigateByUrl("/dashboard/organizers")
      }
    )
  }

}