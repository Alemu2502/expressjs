'use strict';
var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');


// Retrieve all the tasks saved in the database
exports.getAllTasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(task);
    }
  });
};

// Create a new task
exports.createNewTask = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(task);
    }
  });
};

// Retrieve a task by taskId
exports.getTaskById = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err) {
      res.status(404).send({ error: { errors: [ { domain: 'global', reason: 'notFound', message: 'Not Found', 
                            description: 'Couldn\'t find the requested taskId \'' + req.params.taskId + '\'' } ], err, code: 404 } })
    } else {
      res.json(task);
    }
  });
};

// Edit a task by taskId
exports.editTaskById = function(req, res) {
  
  Task.findOneAndUpdate({_id: req.params.taskId}, {$set:req.body}, {new: true, runValidators: true}, function(err, task) {
    if (err) {
      res.status(400).send(err);
    }
    else if(!task){
      res.status(404).send({message: 'task not found'});
    }
    else {
      res.json(task);
    }
  });
};

// Delete a task by taskId
exports.deleteTaskById = function(req, res) {
Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err) {
      res.status(404).send({ error: { errors: [ { domain: 'global', reason: 'notFound', message: 'Not Found', 
                            description: 'Couldn\'t find the requested taskId \'' + req.params.taskId + '\'' } ], code: 400, message: 'Not Found' } })
    } else {
      res.status(204).send();
      
    }
  });
};











