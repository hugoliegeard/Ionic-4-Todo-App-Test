import {Component} from '@angular/core';
import {Task} from '../models/task';
import {TaskStorageService} from '../services/task-storage.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private taskStorage: TaskStorageService) {
        this.taskStorage.getTasks().then(tasks => {
            if (null !== tasks) {
                this.tasks = tasks;
            }
        });
    }

    /** Création d'une tâche */
    task: Task = new Task();

    /** Création d'une Date */
    date: Date = new Date();

    /** Liste de tâches */
    tasks: Task[] = [];

    /**
     * Déclenche l'enregistrement
     * d'une nouvelle tâche.
     */
    saveTask() {
        if (undefined !== this.task.title) {
            this.task.id = Date.now();
            this.tasks.push(this.task);
            this.saveOurTasks();
            this.task = new Task();
        }
    }

    /**
     * Déclenche l'enregistrement
     * lors de la pression sur "Entrer"
     * @param code
     */
    saveOnEnter(code: string) {
        if (code === 'Enter') {
            this.saveTask();
        }
    }

    /**
     * Sauvegarder les tâches
     */
    saveOurTasks() {
        this.taskStorage.saveTasks(this.tasks);
    }

    /**
     * Supprimer une tâche
     * @param task
     */
    deleteTask(task: Task) {
        _.pullAllWith(this.tasks, [task], _.isEqual);
        this.saveOurTasks();
    }

    niveauProgress() {
        let i = 0;
        let j = 0;
        while (i < this.tasks.length) {
            if (this.tasks[i].status) {
                j++;
            }
            i++;
        }
        return j / this.tasks.length;
    }
}
