"use server"

import { connectToDatabase } from "../database";
import Task from "../database/models/task.model";

export const createTask = async (task) => {
    try {
        await connectToDatabase()

        const newTask = await Task.create(task)
        if(!newTask) throw new Error('Task creation failed')

        return JSON.parse(JSON.stringify(newTask))
    } catch (error) {
        console.log(error);
    }
}

export const getAllTasks = async ({query, filterStatus, filterPriority}) => {
    try {
        await connectToDatabase()

        const nameCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
        const statusCondition = filterStatus ? {status: filterStatus} : {}
        const priorityCondition = filterPriority ? {priority: filterPriority} : {} 

        const conditions = {
            $and: [nameCondition, statusCondition, priorityCondition],
        }

        const statusOrder = ['Pending', 'In Progress', 'Completed'];
        const priorityOrder = ['High', 'Medium', 'Low'];
        const tasks = await Task.aggregate([
            { $match: conditions },
            {
              $addFields: {
                statusOrder: { $indexOfArray: [statusOrder, "$status"] },
                priorityOrder: { $indexOfArray: [priorityOrder, "$priority"] },
              }
            },
            { $sort: { statusOrder: 1, priorityOrder: 1 } },
            { $project: { statusOrder: 0, priorityOrder: 0 } }  
        ]);
        const tasksCount = await Task.countDocuments(conditions)
        
        return {
            data: JSON.parse(JSON.stringify(tasks)),
            totalDocs: tasksCount,
        }

    } catch (error) {
        console.log(error);
    }
}

export const getTask = async (id) => {
    try {
        await connectToDatabase()

        const task = await Task.findById(id)
        if(!task) throw new Error('Task not found')

        return JSON.parse(JSON.stringify(task))
    } catch (error) {
        console.log(error);
    }
}

export const getTaskCountBasedOnStatus = async () => {
    try {
        await connectToDatabase()

        const tasksByStatusAndPriority = await Task.aggregate([
            {
                $group: {
                    _id: { status: "$status", priority: "$priority" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.status",
                    priorities: {
                        $push: {
                            priority: "$_id.priority",
                            count: "$count"
                        }
                    }
                }
            }
        ]);
        const formattedData = tasksByStatusAndPriority.map(statusGroup => {
            const priorityCounts = { High: 0, Medium: 0, Low: 0 };
            statusGroup.priorities.forEach(priorityGroup => {
                if (priorityCounts.hasOwnProperty(priorityGroup.priority)) {
                    priorityCounts[priorityGroup.priority] = priorityGroup.count;
                }
            });
            return {
                id: statusGroup._id,
                ...priorityCounts
            };
        });
        const tasksCount = await Task.countDocuments()

        return {
            data: JSON.parse(JSON.stringify(formattedData)),
            totalTasks: tasksCount,
        };

    } catch (error) {
        console.log(error);
    }
}

export const updateTask = async (id, task) => {
    try {
        await connectToDatabase()

        const newTask = await Task.findByIdAndUpdate(id, task, {
            new: true,
        })
        if(!newTask) throw new Error('Task updation failed')

        return JSON.parse(JSON.stringify(newTask))
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = async (id) => {
    try {
        await connectToDatabase()

        const task = await Task.findById(id)
        if(!task) throw new Error('Task not found')

        const deletedTask = await Task.findByIdAndDelete(id)
        if(!deletedTask) throw new Error('Task deletion failed')

        return JSON.parse(JSON.stringify(deletedTask))
    } catch (error) {
        console.log(error);
    }
}