import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  taskId!: string;
  listId!: string;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private toast: ToastrService) { }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params['taskId'];
        this.listId = params['listId'];
      }
    )
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
      this.toast.success("Task updated successfully", "Success");
    })
  }

}
