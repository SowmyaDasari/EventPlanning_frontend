import { OptionalDetails } from './optionaldetails';
import { SpeakerSponsorService } from './speaker-sponsor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-speakers-sponsors-list',
  templateUrl: './speakers-sponsors-list.component.html',
  styleUrls: ['./speakers-sponsors-list.component.css']
})
export class SpeakersSponsorsListComponent implements OnInit {
 speakerDetail:OptionalDetails[];
 sponsorDetail:OptionalDetails[];
  event_id:number;
  constructor(private toastr: ToastrService,private role:SpeakerSponsorService,private router: Router,private route: ActivatedRoute,) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.event_id=+params['eventid'] 
     
   })

  
   this.role.displaySpeaker(this.event_id).subscribe((response)=>{
     this.speakerDetail=response
   })
   this.role.displaySponsor(this.event_id).subscribe((response)=>{
    this.sponsorDetail=response
  })
  }

 toSpeaker(speakerid:number)
 {

  this.role.sendToSpeaker(speakerid,this.event_id).subscribe(
    (response)=>{if(response=="success")
    this.toastr.success('Success',"request send successfully");
    else
    this.toastr.error('Failed',response);
      
    }
  )
 }

 toSponsor(sponsorid:number)
 {
 this.role.sendToSponsor(sponsorid,this.event_id).subscribe(
  (response)=>{if(response=="success")
  this.toastr.success('Success',"request send successfully");
  else
  this.toastr.error('Failed',response);
    
  })

 }

 download(filename:String)
 {
   this.role.downloadFile(filename)
   .subscribe((res)=>{
    var url = window.URL.createObjectURL(res.data);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = res.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // remove the element
  }, error => {
    console.log('download error:', JSON.stringify(error));
  }, () => {
    console.log('Completed file download.')
  });
     
 }

}