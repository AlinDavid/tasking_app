import * as mongoose from 'mongoose';
import { ITask, Status } from '../interfaces/task';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

export const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title cannot be empty'],
    },
    description: String,
    status: String,
    dueDate: {
      type: Date,
      required: [true, 'The expected finish date cannot be empty'],
    },
    assignee: String,
    createdBy: {
      type: String,
      required: [true, 'The user cannot be empty'],
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true, versionKey: false, transform: transformValue },
    toObject: { virtuals: true, versionKey: false, transform: transformValue },
  },
);

// This can be removed if we want to change the user who created the task
TaskSchema.pre('validate', function (next) {
  const self = this as ITask;

  if (this.isModified('createdBy') && self.createdAt) {
    this.invalidate('createdBy', 'The field value cannot be updated');
  }

  next();
});
