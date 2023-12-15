export interface ITask {
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

export enum Status {
  Todo = "TO_DO",
  InProgress = "IN_PROGRESS",
  InReview = "IN_REVIEW",
  Done = "DONE",
}
