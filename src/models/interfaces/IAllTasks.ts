import { ITask } from "./ITask";

export interface IAllTasks{
    pendings?: ITask[];
    completeds?: ITask[];
    overdues?: ITask[];
}