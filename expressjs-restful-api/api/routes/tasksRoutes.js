'use strict';
var tasksList = require('../controllers/tasksController');

module.exports = function(app){
app.route('/tasks')
  .get(tasksList.getAllTasks)
  .post(tasksList.createNewTask);

app.route('/tasks/:taskId')
  .get(tasksList.getTaskById)
  .patch(tasksList.editTaskById)
  .delete(tasksList.deleteTaskById)
};