export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  due_date: Date;
  status: 'pending' | 'in-progress' | 'completed';
  userId: string;
}