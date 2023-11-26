import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Subject, throwError} from "rxjs";
import firebase from "firebase/compat";
import Config = firebase.auth.Config;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  movieChanged = new Subject();
  tasksChanged = new Subject();

  movies = [];

  constructor(private http: HttpClient) {

  }

  login(credentials) {
    return this.http.post<Config>("http://localhost:8080/api/auth/signin", credentials)
      .pipe(
        catchError((error: any) => {
          // Handle the error here
          console.error('An error occurred:', error);
          // Optionally, re-throw the error or return a default value
          return throwError('Something went wrong');
        })
      );
  }

  logout() {
    return this.http.post("http://localhost:8080/api/auth/signout","")
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

  deleteTask(body: any) {
    return this.http.delete('http://localhost:8080/borrarVideojuego', body);


  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
