import { Component, OnInit } from '@angular/core';
import { SpeakerSponsor1Service } from './speaker-sponsor1.service';
import { EventConverter } from './../eventconverter';
import { FormGroup, FormControl } from '@angular/forms';
import { Input,Output,EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-speaker-sponsor1',
  templateUrl: './speaker-sponsor1.component.html',
  styleUrls: ['./speaker-sponsor1.component.css']
})
export class SpeakerSponsor1Component implements OnInit {

  errors: Array<string> =[];
  @Input() maxSize: number = 1;
  @Input() fileExt: string = "PDF,DOC";
  

  eventnames: EventConverter[]= [];
  display='none';
  optionalForm:FormGroup;
  file:File;
  userid=+sessionStorage.getItem('userid');
  @Output() uploadStatus = new EventEmitter();
  private isButtonVisible = true;
  check:boolean;

  constructor(private ser1: SpeakerSponsor1Service,private toastr :ToastrService) { }

  ngOnInit() {
    this.getdetails();
    this.optionalForm = new FormGroup({
      role:new FormControl(""),
      linkedin:new FormControl(""),
      userid:new FormControl(this.userid),
      educational_details:new FormControl("")
    });

   this.ser1.checkuser().subscribe(
      (response) =>{
        if(response=="not possible"){
          this.check=true; 
        }
    });
 }

  getdetails() {
    this.ser1.geteventnames().subscribe(
      (eventnames) =>{
        if(eventnames.length==0){
          this.toastr.info('Info', "No events to take part");
        }else{
          this.eventnames=eventnames;
        }
      });
  }

  openModalDialog(){ 
    this.display='block'; 
  }

 closeModalDialog(){
  this.display='none'; 
  if(this.errors.length!=0){
    this.toastr.error('Error', "Cannot upload as size or extension of file are not as mentioned");
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

isValidFileExtension(){
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
   this.ser1.setRoleforEvent(formdata).subscribe(
    (response) =>{
      if(response=="successful"){
        this.toastr.success('Success', "Successfully Enrolled");
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
