export enum TaskStatus {
  CREATED = "Created", // topic created, files may or may not be uploaded,
  GENERATING = "Generating...", // generating in progress
  COMPLETED = "Completed", // all generated questions graded
  ATTEMPTING = "Attempting", // there are questions ungraded, default state
}

export interface ITask {
  topicID: number;
  topicName: string;
  lastModified: string;
  status: TaskStatus;
  questionsAttempted: number;
  questionsTotal: number;
}
