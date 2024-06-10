import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {

  listId!: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private toast: ToastrService) { }

  createTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe((newTask) => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.toast.success("Task created successfully", "Success");
    })

  }

}
