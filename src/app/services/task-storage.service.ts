import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {

  constructor(private storage: Storage) { }

  /**
   * Permet de sauvegarder les tâches.
   * @param tasks
   */
  saveTasks(tasks: Task[]): void {
    this.storage.set('tasks', tasks);
  }

  /**
   * Récupérer les tâches sauvegardées.
   */
  getTasks(): Promise<Task[]> {
    return this.storage.get('tasks');
  }

}
