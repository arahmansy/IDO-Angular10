import { Component ,OnInit , ViewChild, ElementRef} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms'; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoItemFormComponent } from './todo-items/todo-item-form/todo-item-form.component';
import { MatCard } from '@angular/material/card';
import {MatListModule} from '@angular/material/list'; 
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoServiceService } from './services/todo-service.service';
import { TodoItem } from './models/todo-item.model';
//import { error } from 'console';

@Component({
  selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls : ['./app.component.css']
})
export class AppComponent  implements OnInit {

   
  title = 'todolist';
  value="";
  itemslist: TodoItem[]=[];

  todo : TodoItem[]=[];//[  'Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing : TodoItem[]=[]; // = ['task1','task2','task3'];
  done  : TodoItem[]=[] ;//= ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
item :TodoItem;
search=false;
searchText='';
toggleSearch:boolean = false;
editeitem="0";
todoedit = false;
doneedit= false;
doingedit=false;
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

     // console.log(event.previousContainer.data[event.previousIndex]);
    //  console.log(this.todo[event.previousIndex]);
      //console.log(event.previousContainer.data[event.previousIndex]["itemName"]);
     // console.log("item= " + event.previousContainer.data[event.previousIndex]+" new group= " + event.container.id)
      

      /// getting the previous item that we going to update its status
this.item  =  event.previousContainer.data[event.previousIndex] as unknown as TodoItem;
console.log(this.item);
     
      if(event.container.id==="todo")
      {
        this.item.itemStatus="todo";
      }
      else if(event.container.id==="doing")
      {
        this.item.itemStatus="doing";
      }else
      {
        this.item.itemStatus="done";
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // console.log("updating");
      // console.log(this.item);
      // console.log(this.item.itemID);
      this.service.putToDoItem(this.item.itemID.toString(),this.item).subscribe(data => console.log(data)
      , error => console.error(error));
    }
  }

constructor( public service :TodoServiceService, private dialog : MatDialog ){
 
   

}


addnewitem()
{

}

openSearch()
{
 
}
searchClose()
{
   
}
onKeyUp($event, _item , _itemid)
{
  this.todoedit=false;
  this.editeitem="0";
  console.log(this.todo)

  console.log(_item);
  console.log(_itemid);
  this.service.putToDoItem(_itemid,_item ).subscribe(data => console.log(data)
  , error => console.error(error));

}


ngOnInit() {
  //console.log('main section ngOnInit running')
  
}


onchange(item)
{
  console.log(item);
    
}
  opendialog()
  {
    const dialogconfig = new MatDialogConfig();
   // dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="40%";
    dialogconfig.data={name:this.value};

    this.dialog.open(TodoItemFormComponent,dialogconfig );
    this.service.refreshList();
    this.listall();

    console.log("opendialog");
  }

  
 

  listall()
  {
    this.itemslist = this.service.list;
    //this.service.refreshList();
   // console.log( this.service.list[0].itemName);
    //console.log(this.itemslist);

    for (let i = 0 ;i <this.itemslist.length;i++ )
    {
      switch(this.itemslist[i].itemStatus)
      {
        case "todo" :
          //console.log(this.itemslist[i]);
          this.todo.push(this.itemslist[i]);
        break;
        case "doing":
          this.doing.push(this.itemslist[i]);
          break;
          case "done":
            this.done.push(this.itemslist[i]);
            break;

      }
      
      

    }
    console.log(this.done);
      console.log(this.doing);
      console.log(this.todo);
    
  }
}
