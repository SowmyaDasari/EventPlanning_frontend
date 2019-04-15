import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeakereventDescriptionService } from './speakerevent-description.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Event } from './../event';
import 'rxjs/add/operator/switchMap';
import { Input,Output,EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-speakerevent-description',
  templateUrl: './speakerevent-description.component.html',
  styleUrls: ['./speakerevent-description.component.css']
})
export class SpeakereventDescriptionComponent implements OnInit {
  
  errors: Array<string> =[];
  @Input() fileExt: string = "PDF";
	@Input() maxSize: number = 2; 
  eventdetails: Event;
  display='none';
  disabled='false';
  optionalForm:FormGroup;
  file:File;
  eventid:number;
  isValid:boolean=false;
  userid=+sessionStorage.getItem('userid');
  check:boolean;
  //linkedin:string;
  @Output() uploadStatus = new EventEmitter();
  
  
  
  
  constructor(private router: Router, private ser2: SpeakereventDescriptionService, private route: ActivatedRoute,private toastr :ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.eventid =+params['eventid']})
    this.route.params
    .switchMap((params: Params) => this.ser2.selectedevent(params['eventid']))
    .subscribe((response: Event) => {this.eventdetails = response });

    this.ser2.checkevent(this.eventid).subscribe(
      (response) =>{
        if(response=="not possible"){
          this.check=true; 
        }
    });

    this.optionalForm = new FormGroup({
      role:new FormControl(""),
      linkedin:new FormControl(""),
      userid:new FormControl(this.userid),
      eventid : new FormControl(this.eventid),
      educational_details:new FormControl("")
    });
  }

  openModalDialog(){ 

    this.display='block'; //Set block css
    }
    

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
  if(this.errors.length!=0){
    this.toastr.error('Error', "size or extension of file are not as mentioned");
  }
 }

 onSelectFile(event){
  this.file=<File>event.target.files[0];
  this.checkFile();

}

checkFile(){
  this.errors = []; // Clear error
  // Validate file size and allowed extensions
  if (this.isValidFileExtension()!=0) {
      this.uploadStatus.emit(true);
      return;
  } 
  else{
    this.uploadStatus.emit(false);
  } 

}

isValidFileSize() {
  var fileSizeinMB = this.file.size / (1024 * 1000);
  var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
  if (size > this.maxSize)
      this.errors.push("Error (File Size): " + this.file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
  return this.errors.length;
  }

  private isValidFileExtension(){
    // Make array of file extensions
      var extension = (this.fileExt.split(','))
                      { this.fileExt.toLocaleUpperCase().trim() };
          // Get file extension
      var ext = this.file.name.toUpperCase().split('.').pop() || this.file.name;
          // Check the extension exists
      var exists = extension.includes(ext);
      if (!exists) {
          this.errors.push("Error (Extension): " + this.file.name);
      }
          // Check file size
      this.isValidFileSize();
      return this.errors.length;


}


 senddata(){
    if(this.errors.length==0){
    const userevent = this.optionalForm.value;
    const formdata = new FormData;
    formdata.append('userevent',JSON.stringify(userevent));
    formdata.append('file',this.file);
     this.ser2.setRoleforEvent(formdata).subscribe(
      (response) =>{
        if(response=="successful"){
          this.toastr.success('Success', "Successfully Applied");
          this.check=true;
        }
        else if(response=="not possible"){
          this.toastr.info('Info', "You have already enrolled ");
          this.check=true;
        }
      });
    }
    
 }

 


}
