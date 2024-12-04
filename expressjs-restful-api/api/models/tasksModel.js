'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

// JSON schema for Tasks
const TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  category: {
    type: String,
    required: 'Kindly enter the category of the task'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['Pending', 'Ongoing', 'Completed']
    }],
    default: ['Pending']
  }
});

export const Task = mongoose.model('Tasks', TaskSchema);
