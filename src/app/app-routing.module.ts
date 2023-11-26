import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {EditComponent} from "./tasks/edit/edit.component";
import {AddComponent} from "./add/add.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'tasks', component: TasksComponent,children:[

      {path:'edit/:id',component:EditComponent},
    ]
  },
  {path:'edit/:id',component:EditComponent},
  {path:"add", component: AddComponent},

  {path:"login", component: LoginComponent},


  {path: '**', redirectTo: '/'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
