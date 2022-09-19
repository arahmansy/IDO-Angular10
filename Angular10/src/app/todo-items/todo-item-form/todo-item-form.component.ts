import { Component, OnInit,Inject } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import { TodoItem } from 'src/app/models/todo-item.model';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TodoItemsComponent } from '../todo-items.component';



export interface DialogData {
  itemadded: TodoItem;
  message : string
}

@Component({
  selector: 'app-todo-item-form',
  templateUrl: './todo-item-form.component.html',
  styleUrls: ['./todo-item-form.component.css'
  ]
})
export class TodoItemFormComponent implements OnInit {

  constructor(public service :TodoServiceService, private fb : FormBuilder ,
    public matdiagref : MatDialogRef<TodoItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}



  ToDoItemForm = this.fb.group({
    itemId:0,
    itemName: ['', [Validators.required]],
    itemStatus: ['todo'],
    itemCategory:'',
    itemImportance:'',
    itemDueDate:'',
    itemEstimate:''});

  ngOnInit(): void {
    this.service.refreshList();
    
    //console.log(this.service.list);
  }

  


  listall()
  {
    this.service.refreshList();
    console.log(this.service.list);
  }
  onsubmit()
  {
    //this.service.todoData=this.ToDoItemForm.value;
    //console.log(this.ToDoItemForm.value);
    this.service.postToDoListItem(this.ToDoItemForm.value).subscribe(data =>{
      console.log(data)
      this.data.itemadded=data as TodoItem
    },err =>{console.error(err)});
   this.data.itemadded=this.ToDoItemForm.value;
   this.data.message="wellcome back";
   //console.log(this.ToDoItemForm.value);
   
    this.matdiagref.close(this.data);
  }
  sendForm()
  {

  }

  initializeForm()
  {
    this.ToDoItemForm.reset();
  }
}
