import { ToastrService } from 'ngx-toastr';
import { Event } from './../event';
import { ParticipantService } from './participant.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router'; 
import 'rxjs/add/operator/switchMap'; 
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-participant',
  
 templateUrl: './participant.component.html',
 providers:[DatePipe],
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {
  status:String;
 eventDetail:Event;
 currentDate=new Date()
  date:String;
 buttonstatus:boolean;
  constructor(private participant:ParticipantService,private toastr: ToastrService,private router: Router,private route: ActivatedRoute,private datePipe: DatePipe) 
  {
    this.date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
   }

  ngOnInit() {
    this.route.params
.switchMap((params: Params) => this.participant.display(params['eventname']))
. subscribe((response:Event)=>{this.eventDetail=response
this.buttonstatus=this.eventDetail.last_date<this.date})
 
}
register(id:number,fees:number)
{
  this.participant.addparticipant(id,fees).subscribe((response)=>{this.toastr.info(response)
     this.router.navigateByUrl('dashboard/eventlist')})
}
withdraw(id:number)
{
  this.participant.deleteparticipant(id).subscribe((response)=>{this.toastr.info(response)
    //this.router.navigateByUrl('dashboard/eventlist')
  })
}
showStatus(id:number)
{
this.participant.show(id).subscribe((response)=>{this.status=response})
}

}