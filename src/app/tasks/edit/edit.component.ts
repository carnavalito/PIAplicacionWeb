import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  taskId: number;
  task;
  editForm: FormGroup;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {

        this.id = +params['id'];

        // this.taskService.getTask(options).subscribe(data => {
        //   // this.task = data[0];
        //   console.log("data");
        //   // console.log(data);
        //   // this.taskId = this.task.id;
        //   // // console.log(this.videogame);
        //   // this.initForm(this.task);
        //
        //
        // });
        // this.taskService.fetchPosts().subscribe(data => {
        //   console.log(data)
        // })

      }
    )
    const body = {id: this.id}
    this.taskService.getTask(body).subscribe(data => {
      this.task = data;
      // this.taskId = this.task.id;
      this.initForm(this.task);

    })


  }

  private initForm(task) {
    this.editForm = new FormGroup({
      'title': new FormControl(task.title, Validators.required),
      'description': new FormControl(task.description, Validators.required),
      'user_id': new FormControl(task.user_id, Validators.required)

    })
  }


  onSubmit() {
    console.log(JSON.stringify(this.editForm.value));
    const body = {newValues: this.editForm.value, task: this.task};
    // console.log(body)
    this.taskService.editTask(body);
    this.location.back();
    alert('Tarea editada con exito');
  }

  goBack() {
    this.location.back();
  }


}
