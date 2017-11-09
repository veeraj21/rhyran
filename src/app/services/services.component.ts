import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  togglelist1: boolean = false;
  togglelist2: boolean = false;
  togglelist3: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
