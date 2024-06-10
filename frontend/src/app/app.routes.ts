import { Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: '', redirectTo: "/lists", pathMatch: 'full'
    },
    {
        path: 'newList', component: NewListComponent
    },
    {
        path: 'edit-list/:listId', component: EditListComponent
    },
    {
        path: "lists/:listId", component: TaskViewComponent
    },
    {
        path: "lists", component: TaskViewComponent
    },
    {
        path: 'lists/:listId/new-task', component: NewTaskComponent
    },
    {
        path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent
    },

];
