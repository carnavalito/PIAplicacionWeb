import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../task.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;

  constructor(private taskService: TaskService, private router:Router) {
  }

  ngOnInit() {

    this.addForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'user_id': new FormControl(0, Validators.required)

    })
  }

  onSubmit() {
    // console.log(this.addForm.value);
    this.taskService.addTask(this.addForm.value).subscribe(responseData => {
        console.log(responseData)
      }
    );
    //
    this.taskService.movieChanged.next(this.taskService.fetchPosts().subscribe());
    this.router.navigateByUrl("/tasks");
    alert('Tarea agregada con exito');


  }

}
