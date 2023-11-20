import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  movieChanged = new Subject();
  tasksChanged = new Subject();

  movies = [];

  constructor(private http: HttpClient) {

  }

  login(credentials){
    return this.http.post("http://localhost:8080/api/auth/signin",credentials)
  }

  fetchPosts() {
    return this.http.get('http://localhost:8080/api/tasks');

  }


  getVideogame(id: number) {
    return this.http.get(`http://localhost:8080/videojuego/${id}`,);
  }

  editVideogame(editedVideogame, id: number) {
    return this.http
      .put(
        `http://localhost:8080/actualizarVideojuego/${id}`,
        editedVideogame
      ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  addTask(task) {
    return this.http
      .post('http://localhost:8080/api/task', task)

  }

  deleteTask(body:any) {
    return this.http.delete('http://localhost:8080/borrarVideojuego',body);


  }




}
