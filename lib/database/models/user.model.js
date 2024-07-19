import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        role: {type: String, required: true},
        imageUrl: {type: String, required: true},
        createdAt: {type: Date, default: new Date()}
    }
)

const User = models.User || model('User', UserSchema)

export default User;