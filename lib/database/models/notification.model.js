import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
    {
        title: {type: String, required: true},
        senderName: {type: String, required: true},
        read: {type: Boolean, default: false},
        createdAt: {type: Date, default: Date.now},
        description: {type: String, required: true},
    }
)

const Notification = models.Notification || model('Notification', NotificationSchema)

export default Notification;