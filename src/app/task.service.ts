import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "./movie.model";
import {map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  movieChanged = new Subject();
  tasksChanged = new Subject();

  movies = [];

  constructor(private http: HttpClient) {

  }


  fetchPosts() {
    return this.http.get('http://localhost:8080/api/tasks');

  }


  getTask(body: any) {
    return this.http.post('http://localhost:8080/api/get/task', body);
  }

  getUser(body: any) {
    return this.http.post('http://localhost:8080/api/get/user', body);
  }

  editTask(body) {
    return this.http
      .post(
        'http://localhost:8080/api/edit/task',
        body
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }

  addTask(task) {
    return this.http
      .post('http://localhost:8080/api/task', task)

  }

  deleteTask(body: any) {
    return this.http.delete('http://localhost:8080/api/task', body);
  }





}
