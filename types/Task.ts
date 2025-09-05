export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    completed: boolean;
    createdAt: Date;
    deleted?: boolean; 
}