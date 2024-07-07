import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { List } from '../../models/list.model';
import { Task } from '../../models/task.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {

  lists!: List[];
  tasks!: Task[];

  selectedListId!: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private toast: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = [];
        }
      }
    )

    this.taskService.getLists().subscribe((lists) => {
      this.lists = lists;
    });

  }

  onLogout() {
    this.authService.logout();
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    })
  }

  onDeleteListClicked() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      this.toast.success("List deleted", "Success");
    })
  }

  onTaskDeleteClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      this.toast.success("Task deleted", "Success");
    })
  }
}
