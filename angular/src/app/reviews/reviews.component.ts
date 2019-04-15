import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewsService } from './reviews.service';
import { SpeakereventDescriptionService } from '../speakerevent-description/speakerevent-description.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Event } from './../event';
import 'rxjs/add/operator/switchMap';
import { FormGroup, FormControl } from '@angular/forms';
import { ReviewSuggestion } from '../review_suggestion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  eventdetails: Event;
  reviewForm:FormGroup;
  eventid:number;
  display='none';
  isValid:boolean=false;
  userid=+sessionStorage.getItem('userid');
  check:boolean;
  index:number;
  reviews:ReviewSuggestion[]=[];
  suggestions:ReviewSuggestion[]=[];

  constructor(private router: Router,private speakereventservice:SpeakereventDescriptionService, private reviewservice: ReviewsService, private route: ActivatedRoute,private toastr :ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
   }

  ngOnInit() {

    this.route.params.subscribe(params => {this.eventid=+params['eventid'],this.index=+params['index']})
    this.route.params
    .switchMap((params: Params) => this.speakereventservice.selectedevent(params['eventid']))
    .subscribe((response: Event) => {this.eventdetails = response});
      if(this.index==1 ||this.index==3 || this.index==4)
      this.reviewservice.checkreview(this.eventid).subscribe(
        (response) =>{
          if(response=="not possible"){
            this.check=true; 
          }
      });

    this.reviewForm = new FormGroup({
        review:new FormControl(""),
        suggestion:new FormControl(""),
        userid:new FormControl(this.userid),
        eventid : new FormControl(this.eventid),
      });
  }

  openModalDialog(){ 
    this.display='block'; //Set block css
  }

  closeModalDialog(){
    this.display='none'; //set none css after close dialog
    this.router.navigateByUrl('/dashboard/speakerevent-description/:eventid')

  }

  senddata(){

    const formdata = this.reviewForm.value;
     this.reviewservice.setReviewforEvent(formdata).subscribe(
      (response) =>{
        if(response=="successful"){
          this.toastr.success('Success', "Successfully sent");
          this.check=true;
        }
        else if(response=="not possible"){
          this.toastr.info('Info', "You have already given your opinion ");
          this.check=true;
        }
      });
  }

  displayreviews(){
  
    this.reviewservice.getReviews(this.eventid)
        .subscribe((reviews) =>{
          if(reviews.length!=0){
          this.reviews=reviews;
        }
        });

  }
  displaysuggestions(){
  
    this.reviewservice.getSuggestions(this.eventid)
        .subscribe((suggestions) =>{
          if(suggestions.length!=0){
          this.suggestions=suggestions;
        }
        });
  }



}
