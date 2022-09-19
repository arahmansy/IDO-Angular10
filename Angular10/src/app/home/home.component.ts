import { Component, OnInit } from '@angular/core';

import { TodoServiceService } from '../services/todo-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service : TodoServiceService) { }

  ngOnInit(): void {

    //this.service.refreshList();
  }

}
