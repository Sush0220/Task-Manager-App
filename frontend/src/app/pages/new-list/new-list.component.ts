import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router, RouterModule } from '@angular/router';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.css'
})
export class NewListComponent {

  constructor(private taskService: TaskService, private router: Router) { }



  createList(title: string) {
    this.taskService.createList(title).subscribe((list: any) => {
      console.log(list);
      // Now we navigate to /lists/task._id
      this.router.navigate(['/lists', list._id]);
    });
  }
}
