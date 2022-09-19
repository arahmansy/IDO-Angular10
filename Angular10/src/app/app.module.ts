import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Input } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodoItemFormComponent } from './todo-items/todo-item-form/todo-item-form.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JsonPipe } from '@angular/common';
import { MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatListModule} from '@angular/material/list'; 
import { MatListItem } from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { appRoutes } from './routes';
import { AuthGuard } from './services/auth.guard';
import { TodoServiceService } from './services/todo-service.service';
import { HomeComponent } from './home/home.component';
import {MatMenuModule} from '@angular/material/menu'; 
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import {MatDatepickerModule} from '@angular/material/datepicker'; 



const firebaseConfig = {
  apiKey: "AIzaSyBYct4t_9zzbn4DwsUgU1TXWLxfzJYY80Y",
  authDomain: "todolist-angular10.firebaseapp.com",
  projectId: "todolist-angular10",
  storageBucket: "todolist-angular10.appspot.com",
  messagingSenderId: "281537527513",
  appId: "1:281537527513:web:8c6fe30c6e0fce291e08c8",
  measurementId: "G-BKHYD961BH"
};


@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
    TodoItemFormComponent,
    LoginComponent,
    HomeComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, MatDialogModule, MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    DragDropModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatDatepickerModule

   
    




  ],
  providers: [UserService ,AuthGuard , TodoServiceService],
  bootstrap: [AppComponent],
  entryComponents: [TodoItemFormComponent]
})
export class AppModule { }
