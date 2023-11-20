import {Component, OnInit} from '@angular/core';
import {TaskService} from "../task.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any = [];
  subscription: Subscription;

hola:String = "hola";



  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.taskService.fetchPosts().subscribe(data => {
      this.tasks = data;
    });

    this.subscription = this.taskService.tasksChanged
      .subscribe(
        (tasks) => {
          this.tasks = tasks;
        }
      )

  }

  deleteTask(id:number){
    if(window.confirm('Estas Seguro que quieres eliminar la Tarea?')){
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          id: id,
        },
      };

      this.taskService.deleteTask(options).subscribe(data => {
        // console.log(data);
      })
      location.reload();

      // this.appService.tasksChanged.next(this.appService.fetchPosts().subscribe());


    }
  }

  // onFetchPosts() {
  //   // Send Http request
  //   this.taskService.fetchPosts().subscribe(posts => {
  //
  //     console.log(posts);
  //     this.loadedPosts = posts;
  //   });
  // }


}
