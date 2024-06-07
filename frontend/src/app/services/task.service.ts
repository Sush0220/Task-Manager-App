import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: String) {
    return this.webRequestService.post('lists', { title });
  }


  getLists(): Observable<List[]> {
    return this.webRequestService.get<List[]>("lists");
  }

  getTasks(id: String): Observable<Task[]> {
    return this.webRequestService.get<Task[]>(`lists/${id}/tasks`);
  }
  createTask(title: String, id: String) {
    return this.webRequestService.post(`lists/${id}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    })
  }
}
