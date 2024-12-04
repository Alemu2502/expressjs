'use strict';
import mongoose from 'mongoose';
const Task = mongoose.model('Tasks');

// Retrieve all the tasks saved in the database
export const getAllTasks = (req, res) => {
  Task.find({}, (err, task) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(task);
    }
  });
};

// Create a new task
export const createNewTask = (req, res) => {
  const new_task = new Task(req.body);
  new_task.save((err, task) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(task);
    }
  });
};

// Retrieve a task by taskId
export const getTaskById = (req, res) => {
  Task.findById(req.params.taskId, (err, task) => {
    if (err) {
      res.status(404).send({
        error: {
          errors: [
            {
              domain: 'global',
              reason: 'notFound',
              message: 'Not Found',
              description: `Couldn't find the requested taskId '${req.params.taskId}'`
            }
          ],
          code: 404
        }
      });
    } else {
      res.json(task);
    }
  });
};

// Edit a task by taskId
export const editTaskById = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    { $set: req.body },
    { new: true, runValidators: true },
    (err, task) => {
      if (err) {
        res.status(400).send(err);
      } else if (!task) {
        res.status(404).send({ message: 'Task not found' });
      } else {
        res.json(task);
      }
    }
  );
};

// Delete a task by taskId
export const deleteTaskById = (req, res) => {
  Task.remove({ _id: req.params.taskId }, (err, task) => {
    if (err) {
      res.status(404).send({
        error: {
          errors: [
            {
              domain: 'global',
              reason: 'notFound',
              message: 'Not Found',
              description: `Couldn't find the requested taskId '${req.params.taskId}'`
            }
          ],
          code: 400
        }
      });
    } else {
      res.status(204).send();
    }
  });
};
