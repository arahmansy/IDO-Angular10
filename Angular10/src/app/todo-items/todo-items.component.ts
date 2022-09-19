import { Component ,OnInit , ViewChild, ElementRef} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms'; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoItemFormComponent } from '../todo-items/todo-item-form/todo-item-form.component';
import { MatCard } from '@angular/material/card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoServiceService } from '../services/todo-service.service';
import { TodoItem } from '../models/todo-item.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


export interface DialogData {
  itemadded: TodoItem;
  message : string
}


@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls : ['./todo-items.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class TodoItemsComponent implements OnInit {
  title = 'todolist';
  value="";
  itemslist: TodoItem[]=[];
  username="adnan@ggg";

  todo : TodoItem[]=[];//[  'Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing : TodoItem[]=[]; // = ['task1','task2','task3'];
  done  : TodoItem[]=[] ;//= ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
item :TodoItem;
itemtoadd : TodoItem;
search=false;
searchText='';
toggleSearch:boolean = false;
editeitem="0";
todoedit = false;
doneedit= false;
doingedit=false;
userClaims: any;
closebanner=false;



 HEROES = [
  {id: 1, name:'Superman'},
  {id: 2, name:'Batman'},
  {id: 5, name:'BatGirl'},
  {id: 3, name:'Robin'},
  {id: 4, name:'Flash'}
];


constructor( public service :TodoServiceService, private dialog : MatDialog ,
  private router: Router, private userService: UserService,
  private userservice:UserService ){
 
  

}




// ngAfterContentInit()
// {
//   console.log("ngAfterContentInit");
//   this.service.refreshList()
//   console.log(this.service.list);
 
// }
ngOnInit() {

  
  console.log('main section ngOnInit running2')

this.fetchData();
  
   this.username=localStorage.getItem('username');
  //this.service.gettodolist();
  //this.service.refreshList()
   //this.itemslist=this.service.list;
 // console.log(this.itemslist);
 // this.listall();
 
 
 
}


fetchData()
{
  this.service.refreshList().subscribe(
    data => {
      console.log(data);
      this.itemslist=data;
      console.log(this.itemslist);
      this.listall();
  }
 )

}
listall()
{
  //this.itemslist=this.service.list;
  console.log("list all called")
 // this.service.refreshList();
  //console.log(this.service.list)
  //this.itemslist = this.service.list;
  
 // console.log(this.service.list);
 //for (let i = 0 ;i <this.itemslist.length;i++ )
  for (let i = this.itemslist.length-1 ;i >=0 ;i-- )
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
 // console.log(this.done);
  //  console.log(this.doing);
   // console.log(this.todo);
  
}


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



logout() {
  //localStorage.removeItem('userToken');
  localStorage.removeItem('email');
  this.router.navigate(['/login']);
  localStorage.removeItem('username');
  
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
    dialogconfig.data={message :"hello",i:this.itemtoadd};
    
    const dialogRef =this.dialog.open(TodoItemFormComponent,dialogconfig );
    dialogRef.afterClosed().subscribe(result =>{
      this.itemtoadd=result['itemadded']
      console.log(this.itemtoadd);
      //console.log(result);
      this.todo.reverse();
      this.todo.push(this.itemtoadd)
      this.todo.reverse();
     
    },error=>{
      console.error(error)
    })

    
    //console.log(this.itemtoadd);
    
    //console.log("opendialog");
  }

  
  compare(item:string)
  {
    if(item.includes(this.searchText) && this.searchText.length>0)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
 

 
}
