import { Event } from './../event';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event-list/event.service';
import { EventCreation } from './eventcreation';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-creation-form',
  templateUrl: './event-creation-form.component.html',
  providers:[DatePipe],
  styleUrls: ['./event-creation-form.component.css']
})
export class EventCreationFormComponent implements OnInit {
  //eventtype: string[];
  eventcreation: FormGroup;
  event_details:EventCreation={} as any;
  currentDate=new Date()
  date:String;
  constructor(private router: Router,private datePipe: DatePipe,private eventservice:EventService,private toastr :ToastrService) 
  { 
    this.date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  ngOnInit() {
    //this.eventtype=['Multi-Organizer','Single-Organzier'];
    this.eventcreation = new FormGroup({
      event_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      event_date: new FormControl('', [Validators.required]),
     description: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z 0-9]*')]),
     fees: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
     participant_count: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      lastdate: new FormControl('', [Validators.required]),
     event_location: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]+')]),
     eventtype: new FormControl('', [Validators.required]),
})
  }

  createEvent(eventcreation: any){
   this.event_details={organizer_id:+sessionStorage.getItem('userid'),eventname: this.eventcreation.get('event_name').value , eventdate : this.eventcreation.get('event_date').value,
   description: this.eventcreation.get('description').value, participantcount: this.eventcreation.get('participant_count').value ,
   last_date: this.eventcreation.get('lastdate').value,eventlocation: this.eventcreation.get('event_location').value,
   register_fee: this.eventcreation.get('fees').value,eventtype: this.eventcreation.get('eventtype').value }

   //saveEvent method is defined in event.service.ts  inside event-list component 
this.eventservice.saveEvent(this.event_details).subscribe((response)=>
{
  if(response==="successful")
  {
    this.toastr.success('Success', "Event created successfully");
    this.router.navigateByUrl("dashboard/organizers")
   
  }
  else
  this.toastr.error('Error', "Error occured");
});

  }

}