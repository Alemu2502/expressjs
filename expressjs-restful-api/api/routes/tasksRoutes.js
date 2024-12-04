'use strict';
import tasksList from '../controllers/tasksController.js';

export default function(app) {
  app.route('/tasks')
    .get(tasksList.getAllTasks)
    .post(tasksList.createNewTask);

  app.route('/tasks/:taskId')
    .get(tasksList.getTaskById)
    .patch(tasksList.editTaskById)
    .delete(tasksList.deleteTaskById);
}
