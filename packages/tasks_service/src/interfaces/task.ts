import { Document } from 'mongoose';

export interface ITask extends Document {
  id?: string;
  title: string;
  status: Status;
  assignee: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export enum Status {
  Todo = 'TO_DO',
  InProgress = 'IN_PROGRESS',
  InReview = 'IN_REVIEW',
  Done = 'DONE',
}
