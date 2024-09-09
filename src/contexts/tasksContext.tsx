import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAllTasks } from "../models/interfaces/IAllTasks";

interface ITasksContext{
    tasks: IAllTasks;
    handleChangeTasks: (tasks: IAllTasks) => Promise<void>;
}

const TasksContext = createContext({} as ITasksContext)

export const useTasksContext = () => useContext(TasksContext);

interface ITasksProvider{
    children?: React.ReactNode;
}

export const TasksProvider = ({ children }: ITasksProvider) => {
    const [tasks, setTasks] = useState<IAllTasks>({});

    useEffect(() => {
        AsyncStorage.getItem('tasks').then(res => {
            if(res){
                const currentTasks = JSON.parse(res) as IAllTasks;
                setTasks(currentTasks);
            }
        })
    }, [])

    const handleChangeTasks = async (newTasks: IAllTasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
            setTasks(newTasks);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TasksContext.Provider value={{tasks, handleChangeTasks}}>
            {children}
        </TasksContext.Provider>
    )
}