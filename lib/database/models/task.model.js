import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
    {
        title: {type: String, required: true},
        status: {type: String, required: true},
        priority: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
        dueDate: { type: Date },
        completedAt: { type: Date },
        description: {type: String, required: true},
    }
)

const Task = models.Task || model('Task', TaskSchema)

export default Task;