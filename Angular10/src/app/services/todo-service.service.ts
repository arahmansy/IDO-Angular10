import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpClientModule } from '@angular/common/http';
import { TodoItem } from '../models/todo-item.model';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {


  readonly baseURL = "http://localhost:5000/api/Todolists";
 // readonly authURL = "http://localhost:24288/api/Authentication";
  list: TodoItem[]=[];

   todo : TodoItem[]=[];
  doing : TodoItem[]=[];
  done  : TodoItem[]=[] ;
  

  constructor( private http :HttpClient) { }

  todoData: TodoItem = new TodoItem();
  loginData: Login = new Login();
  
  postToDoListItem(data:TodoItem) {
    console.log("Service side");
    console.log(data);
    return this.http.post(this.baseURL, data);
  }

  putToDoItem(id:string , data:TodoItem) {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  deleteTodoItem(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  

  refreshList() : Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.baseURL);
      // .toPromise()
      // .then(res =>this.list = res as TodoItem[]);
     
  }

  gettodolist()
  {
    for (let i = 0 ;i <this.list.length;i++ )
    {
      switch(this.list[i].itemStatus)
      {
        case "todo" :
          //console.log(this.itemslist[i]);
          this.todo.push(this.list[i]);
        break;
        case "doing":
          this.doing.push(this.list[i]);
          break;
          case "done":
            this.done.push(this.list[i]);
            break;

      }
  }
}

}
