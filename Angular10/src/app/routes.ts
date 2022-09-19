import { Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { TodoItemsComponent } from './todo-items/todo-items.component'
import { TodoItemFormComponent } from './todo-items/todo-item-form/todo-item-form.component'

import { LoginComponent } from './login/login.component'
import { AuthGuard } from './services/auth.guard'
import { HomeComponent } from './home/home.component'

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },

    {
        path: 'login', component: LoginComponent,
    },
    { path : '', redirectTo:'/home', pathMatch : 'full'}

];