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

  updateList(id: string, title: string) {
    return this.webRequestService.patch(`lists/${id}`, { title });
  }
  deleteList(id: string) {
    return this.webRequestService.delete(`lists/${id}`);
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

  updateTask(listId: string, taskId: string, title: string) {
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  complete(task: Task) {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    })
  }
}
