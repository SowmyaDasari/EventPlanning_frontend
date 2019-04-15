import { Component, OnInit } from '@angular/core';
import {Event} from '../event';
import {EventService} from './event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  eventList:Event[]=[];
  constructor(private eventservice:EventService) { }

  ngOnInit() {
    this.getEventList();
  }

  getEventList()
  {
    this.eventservice.getList()
    .subscribe(
      (eventList) =>{
        this.eventList=eventList;
      },
      (error) =>console.log(error)
    );
      
  }
}
