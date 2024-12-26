export interface Student {
  id: number;
  name: string;
  email: string;
  specialization: string;
  year: string;
  createdAt: string;
  updatedAt: string;
}

export interface Homework {
  id: number;
  subject: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentHomeworkLink {
  grade: string;
  StudentId: number;
  HomeworkId: number;
  createdAt: string;
  updatedAt: string;
}
